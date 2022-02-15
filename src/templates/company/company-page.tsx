import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import ServiceBlock from '../service/service-block';
import MediaList from '~/ui-components/media-list/media-list';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import { useParams } from 'react-router-dom';
import Image from '~/ui-components/image/image';
import { scrollToTop } from '~/utils';
import { Languages } from '~/store/user/user.slice';
import {
  getCompanyDetails,
  getCompanyMovies,
  getCompanyTvShows,
  getEngCompanyDetails
} from '~/store/company/company.api';
import { MediaType } from '~/core/types/media-type';
import PageSwitcher from '~/ui-components/Page-switcher/Page-switcher';
import FilterList from '~/templates/filters/containers/filter-list';
import './company.sass';
import { usePrevious } from '~/hooks/usePrevious';
import { Collapse } from 'react-collapse';
import Tabs from '~/ui-components/tabs/tabs';
import Tab from '~/ui-components/tabs/tab';
import CompanyMovies from '~/templates/company/company-movies';
import CompanyTvShows from '~/templates/company/company-tv-shows';

type MoviesFilters = {
  adult: boolean;
  sortBy: string | null;
  year: string | null;
  genre: number | null;
}

type TvShowsFilters = Omit<MoviesFilters, 'adult'>

export const initFilters = (isMovies?: true): MoviesFilters | TvShowsFilters => {
  const resp: MoviesFilters | TvShowsFilters = {
    sortBy: null,
    year: null,
    genre: null
  };
  if (isMovies) {
    return { ...resp, adult: false };
  } else {
    return resp;
  }
};

function CompanyPage () {
  const appDispatch = useAppDispatch();
  const { id } = useParams<{id: string}>();
  const { isFetching, isSuccessful, data, lists } = useAppSelector(state => state.company);

  const [prevProps] = useState(id);

  const companyData = data;
  const companyId = id.split('-').pop();

  const sendRequest = () => {
    appDispatch(getCompanyDetails({ id: companyId }));
  };

  useEffect(() => {
    if (!isFetching) {
      sendRequest();
    }
  }, []);

  useEffect(() => {
    if (id !== prevProps) {
      sendRequest();
      scrollToTop();
    }
  }, [id]);

  const handlerOnFetchEngData = () => {
    appDispatch(getEngCompanyDetails({ id: `${companyId}`, lang: Languages.EN }));
  };

  return (
    <div className='main main--media-list'>
      <div className='movies-content company'>
        <ServiceBlock
          isLoading={isFetching}
          isSuccessful={isSuccessful}
          fetch={sendRequest}
        >
          <Helmet>
            <title>{companyData.name}</title>
          </Helmet>

          <div className='company__data'>
            <div className='company__img'>
              <Image
                src={companyData.logoPath && `https://image.tmdb.org/t/p/w185/${companyData.logoPath}`}
                alt='poster'
              />
            </div>
            <div className='company__info'>
              <h1 className='person-name'>{companyData.name}</h1>
              <p className='company__description'>{companyData.description.length > 0 ? companyData.description : 'К сожалению, на данный момент нет описания данной компании.'}</p>
              <div className='company__city'>{companyData.headquarters ? `Месторасположение компании - ${companyData.headquarters}` : ''}</div>
              <div className='company__parent'>{companyData.parentCompany ? `Родительская компания - ${companyData.parentCompany}` : ''}</div>
              <div className='company__links'>
                {companyData.homepage &&
                  <a
                    className='social-link'
                    href={companyData.homepage}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Домашняя страница
                  </a>}
              </div>
            </div>

          </div>

          <Tabs
            defaultActiveKey='movies'
            labels={['Movies', 'Tv shows']}
          >
            <Tab title='movies'>
              <CompanyMovies />
            </Tab>

            <Tab title='tv-shows'>
              <CompanyTvShows />
            </Tab>
          </Tabs>

        </ServiceBlock>
      </div>
    </div>
  );
}

export default CompanyPage;
