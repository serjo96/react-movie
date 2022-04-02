import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';

import ServiceBlock from '~/templates/service/service-block';
import MediaList from '~/ui-components/media-list/media-list';
import Input from '~/ui-components/input/input';
import PageSwitcher from '~/ui-components/Page-switcher/Page-switcher';

import { MediaType } from '~/core/types/media-type';
import { onSearchRequest } from '~/store/search/search.api';

import { useLangEffect } from '~/hooks/useLangEffect';
import { getRandomInt, scrollToTop } from '~/utils';
import { friendlyName, friendlyUrl } from '~/utils/format';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';

import './search-page.sass';

const randomInt = getRandomInt(0, 3);
function SearchPage () {
  const appDispatch = useAppDispatch();
  const history = useHistory();
  const { t } = useTranslation('search');
  const { search } = useLocation();
  const [prevProps] = useState(search);
  const queryParams = queryString.parse(search, { parseNumbers: true });
  const initValue = queryParams.query as string ? friendlyName(queryParams.query as string) : '';
  const [value, setValue] = useState(initValue);
  const { isFetching, isSuccessful, data } = useAppSelector(state => state.search.pageSearch);

  const sendRequest = () => {
    appDispatch(onSearchRequest({
      words: value,
      page: queryParams.page as number
    }));
  };

  useLangEffect(() => {
    if (queryParams.query && !isFetching) {
      sendRequest();
      scrollToTop();
    }
  }, []);

  useLangEffect(() => {
    if (search !== prevProps) {
      sendRequest();
      scrollToTop();
      setValue(friendlyName(queryParams.query as string));
    }
  }, [search]);

  const onInput = (value: string) => {
    setValue(value);
  };

  const onKeyDown = (key: string) => {
    if (key === 'Enter' && value.length) {
      const query = friendlyUrl(value);
      history.push({
        search: queryString.stringify({ query }, { sort: false })
      });
    }
  };

  const onClick = () => {
    if (value.length) {
      const query = friendlyUrl(value);
      history.push({
        search: queryString.stringify({ query }, { sort: false })
      });
    }
  };

  const titleSearch = data.results.length ? `${t('resultSearch')} «${(queryParams.query as string).replace('_', ' ')}» (${data.totalResults})` : t('defaultTitle');

  return (
    <main className='search-page main main--media-list '>

      <Helmet>
        <title>{titleSearch}</title>
      </Helmet>
      <div className='movies-content iphonex'>
        <h2 className='search-page-title'>{titleSearch}</h2>

        <div className='search-field-wrapper'>
          <Input
            className='search__field'
            name='Search'
            type='search'
            placeholder={t('placeholder', { count: randomInt })}
            onChange={onInput}
            onKeyDown={onKeyDown}
            value={value}
          />
          <div className='search-field-btn' onClick={onClick}>
            <i className='fa fa-search' aria-hidden='true' />
          </div>
        </div>
        <ServiceBlock
          isLoading={isFetching}
          isSuccessful={isSuccessful}
          fetch={sendRequest}
        >
          <div className='search-results'>
            <MediaList
              mediaList={data.results}
              typeList={MediaType.MIXED}
            />

            <PageSwitcher
              totalPages={data.totalPages}
              page={data.page}
            />
          </div>
        </ServiceBlock>
      </div>
    </main>
  );
}

export default SearchPage;
