import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';

import {
  getCompanyDetails
} from '~/store/company/company.api';

import ServiceBlock from '../service/service-block';
import Image from '~/ui-components/image/image';
import Tabs from '~/ui-components/tabs/tabs';
import Tab from '~/ui-components/tabs/tab';
import CompanyMovies from '~/templates/company/company-movies';
import CompanyTvShows from '~/templates/company/company-tv-shows';

import { useLangEffect } from '~/hooks/useLangEffect';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import { scrollToTop } from '~/utils';
import './company.sass';
import { friendlyUrl } from '~/utils/format';

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
  const { t } = useTranslation(['common', 'company']);
  const { id } = useParams<{id: string}>();
  const { isFetching, isSuccessful, data } = useAppSelector(state => state.company);

  const [prevProps] = useState(id);

  const companyData = data;
  const companyId = id.split('-').pop();

  const sendRequest = () => {
    appDispatch(getCompanyDetails({ id: +companyId }));
  };

  useLangEffect(() => {
    if (!isFetching) {
      sendRequest();
    }
  }, []);

  useLangEffect(() => {
    if (id !== prevProps) {
      sendRequest();
      scrollToTop();
    }
  }, [id]);

  // const handlerOnFetchEngData = () => {
  //   appDispatch(getEngCompanyDetails({ id: `${companyId}`, lang: Languages.EN }));
  // };

  const renderParentCompany = () => {
    if (!companyData.parentCompany) {
      return null;
    }
    return (
      <div>
        <div>
          {t('company:parentCompany')}:
          <Link
            style={{ marginLeft: '5px' }}
            className='link'
            to={`/company/${friendlyUrl(companyData.parentCompany.name)}-${companyData.parentCompany.id}`}
          >
            <span>{companyData.parentCompany.name}</span>
          </Link>
        </div>
      </div>
    );
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
            <div className='company-info'>
              <h1 className='person-name'>{companyData.name}</h1>
              <p className='company__description'>{companyData.description.length > 0 ? companyData.description : t('company:noDescription')}</p>
              <div className='company-info__row company__city'>{companyData.headquarters ? `${t('company:location')}:  ${companyData.headquarters}` : ''}</div>
              <div className='company-info__row company__parent'>{renderParentCompany()}</div>
              <div className='company-info__row company__links'>
                {companyData.homepage &&
                  <a
                    className='social-link'
                    href={companyData.homepage}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {t('company:homePageLink')}
                  </a>}
              </div>
            </div>

          </div>

          <Tabs
            defaultActiveKey='movies'
            labels={[t('common:nav.movies.sectionTitle'), t('common:nav.tvShows.sectionTitle')]}
          >
            <Tab tabKey='movies'>
              <CompanyMovies />
            </Tab>

            <Tab tabKey='tv-shows'>
              <CompanyTvShows />
            </Tab>
          </Tabs>

        </ServiceBlock>
      </div>
    </div>
  );
}

export default CompanyPage;
