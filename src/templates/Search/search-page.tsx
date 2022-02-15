import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import ServiceBlock from '../service/service-block';
import MediaList from '~/ui-components/media-list/media-list';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import { useHistory, useLocation } from 'react-router-dom';
import { scrollToTop } from '~/utils';
import { onSearchRequest } from '~/store/search/search.api';
import PageSwitcher from '~/ui-components/Page-switcher/Page-switcher';
import { MediaType } from '~/core/types/media-type';
import queryString from 'query-string';
import { friendlyName, friendlyUrl } from '~/utils/format';
import Input from '~/ui-components/input/input';
import './search-page.sass';

function SearchPage () {
  const appDispatch = useAppDispatch();
  const history = useHistory();
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

  useEffect(() => {
    if (queryParams.query && !isFetching) {
      sendRequest();
      scrollToTop();
    }
  }, []);

  useEffect(() => {
    if (search !== prevProps) {
      sendRequest();
      scrollToTop();
      setValue(queryParams.query as string);
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

  const titleSearch = data.results.length ? `Результаты поиска «${(queryParams.query as string).replace('_', ' ')}» (${data.totalResults})` : 'Поиск на movie base';

  return (
    <main className='search-page main main--media-list '>

      <Helmet>
        <title>{titleSearch}</title>
      </Helmet>
      <div className='movies-content iphonex'>
        <div className='search-field-wrapper'>
          <Input
            className='search__field'
            name='Search'
            type='search'
            placeholder='Поиск фильмов и сериалов...'
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
              movieListTitle={`${titleSearch}`}
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
