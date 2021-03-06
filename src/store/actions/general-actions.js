import { CLEAR_SEARCH, GENRES, SEARCH_IN_HEADER, SEARCH_IN_PAGE, SEARCH_KEYWORDS_MOVIES, SEARCH_RESET_FETCH, MEDIA_ENG_DATA } from '../constants/';

export function searchMovie (querySearch) {
  return {
    type: SEARCH_IN_HEADER,
    querySearch
  };
}

export function searchPageResults (results) {
  return {
    type: SEARCH_IN_PAGE,
    results
  };
}

export function clearSearch () {
  return {
    type: CLEAR_SEARCH
  };
}

export function takeGenres (genres) {
  return {
    type: GENRES,
    genres
  };
}

export function takeKeywordsMovies (keywords) {
  return {
    type: SEARCH_KEYWORDS_MOVIES,
    keywords
  };
}

export function takeEngMedia (engData) {
  return {
    type: MEDIA_ENG_DATA,
    engData
  };
}

export function searchResetFetch (load) {
  return {
    type: SEARCH_RESET_FETCH,
    load
  };
}
