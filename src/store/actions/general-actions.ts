import { Movie, SearchResult, TvShow, Person, Genre, MovieDetails, TvShowDetails } from 'tmdb-typescript-api';
import ActionPayloadData from '~/core/types/ActionPayloadData';
import {
  CLEAR_SEARCH,
  GENRES,
  SEARCH_IN_HEADER,
  SEARCH_IN_PAGE,
  SEARCH_KEYWORDS_MOVIES,
  SEARCH_RESET_FETCH,
  MEDIA_ENG_DATA
} from '../constants/';

interface GenresActionData {
  movie: Array<Genre>,
  tv: Array<Genre>
}

export function searchMovie (querySearch: SearchResult<Movie>) {
  return {
    type: SEARCH_IN_HEADER,
    querySearch
  };
}

export function searchPageResults (results: ActionPayloadData<SearchResult<Movie | TvShow | Person>>) {
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

export function takeGenres (genres: GenresActionData) {
  return {
    type: GENRES,
    genres
  };
}

export function takeKeywordsMovies (keywords: ActionPayloadData<Array<Movie | TvShow>>) {
  return {
    type: SEARCH_KEYWORDS_MOVIES,
    keywords
  };
}

export function takeEngMedia (engData: ActionPayloadData<MovieDetails | TvShowDetails>) {
  return {
    type: MEDIA_ENG_DATA,
    engData
  };
}

export function searchResetFetch () {
  return {
    type: SEARCH_RESET_FETCH
  };
}
