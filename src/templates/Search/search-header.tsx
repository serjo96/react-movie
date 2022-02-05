import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';
import queryString from 'query-string';

import ServiceBlock from '~/templates/service/service-block';
import Image from '~/ui-components/image/image';
import Input from '~/ui-components/input/input';
import { friendlyUrl, urlRusLat } from '~/utils/format';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import { useOnClickOutside } from '~/hooks/useOnClickOutside';
import { getSearchData } from '~/store/search/search.api';
import { SearchResultItem } from '~/core/types/search';
import { MediaType } from '~/core/types/media-type';

function SearchHeader () {
  const componentRef = useRef(null);
  const appDispatch = useAppDispatch();
  const history = useHistory();
  const [value, setValue] = useState('');
  const [visibilityResult, setVisibilityResult] = useState(false);
  const { isFetching, isSuccessful, data } = useAppSelector(state => state.search.headerSearch);
  useOnClickOutside(componentRef, () => setVisibilityResult(false));

  const resetState = () => {
    setValue('');
    setVisibilityResult(false);
  };

  const sendRequest = (inputValue: string) => {
    appDispatch(getSearchData(inputValue));
  };

  const redirectOnSearchPage = () => {
    const query = friendlyUrl(value);
    resetState();
    history.push({
      pathname: '/search',
      search: queryString.stringify({ query }, { sort: false })
    });
  };

  const onInput = (inputValue: string) => {
    if (value.length) {
      setValue(value);
      sendRequest(inputValue);
      setVisibilityResult(true);
    }
  };

  const onKeyDown = (key: string) => {
    if (key === 'Enter' && value.length) {
      redirectOnSearchPage();
    }
  };

  const onClickSearch = () => {
    if (value.length) {
      redirectOnSearchPage();
    }
  };

  const elementType = (type: MediaType, personDepartment?: string) => {
    switch (type) {
      case MediaType.MOVIE:
        return 'фильм';
      case MediaType.TV:
        return 'сериал';
      case MediaType.PERSON:
        return personDepartment;
    }
  };

  const renderResults = (item: SearchResultItem, index: number) => {
    return (
      <Link
        to={`/${item.mediaType}/${urlRusLat(item.title || item.name)}-${item.id}`}
        className='result-element'
        key={index}
        onClick={resetState}
      >
        <div className='result-element__poster'>
          <Image
            showSpinner
            src={(item.profilePath || item.backdropPath || item.posterPath) &&
              'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + (item.profilePath || item.backdropPath || item.posterPath)}
            alt='poster'
          />
        </div>
        <div className='result-element__title'>
          <div>{item.title || item.name}</div>
          <div className='result-element__release'>
            {item.releaseDate
              ? item.releaseDate.substring(0, 4)
              : item.firstAirDate
                ? item.firstAirDate.substring(0, 4).substring(0, 4)
                : null}
          </div>
        </div>
        <div className='result-element__type'>{elementType(item.mediaType, item.knownForDepartment)}</div>
      </Link>
    );
  };


  return (
    <div
      className='header__search search'
      ref={componentRef}
    >
      <div className='search-field-wrapper'>
        <Input
          className='search__field search__field--header'
          name='search'
          debounceTimeout={500}
          type='search'
          placeholder='Поиск фильмов и сериалов...'
          onInput={value => setValue(value)}
          onChange={onInput}
          onKeyDown={onKeyDown}
          value={value}
          onFocus={() => value.length && setVisibilityResult(true)}
        />
        <div className='search-btn' onClick={onClickSearch}>
          <i className='fa fa-search' aria-hidden='true' />
        </div>
      </div>

      <div className='search-combo-box'>
        {visibilityResult &&
          <ServiceBlock
            isLoading={isFetching}
            isSuccessful={isSuccessful}
            fetch={() => sendRequest(value)}
          >
            {data.totalResults
              ? <Scrollbars
                autoHeight
                autoHeightMin={95}
                autoHeightMax={300}
                >
                {data.results.map(renderResults)}
                </Scrollbars>
              : <div className='result-element'>Поиск не дал результатов, попробуйте уточнить поиск</div>}
          </ServiceBlock>}
      </div>
    </div>
  );
}

export default SearchHeader;
