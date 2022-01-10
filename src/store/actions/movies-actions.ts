import { Movie, MovieDetails, SearchResult } from 'tmdb-typescript-api';
import {
  UPCOMING_MOVIES, ALL_MOVIES, PLAYING_MOVIES, TOP_MOVIES, MOVIE_DATA, CLEAR_MOVIE_DATA,
  MOVIE_ENG_DATA, CHANGE_MOVIES_PAGE
} from '~/store/constants';
import ActionPayloadData from '~/core/types/ActionPayloadData';

type AllMoviesPayload = SearchResult<Movie[]> & {sortByDate: string}

export function loadUpcomingMovies (movies: ActionPayloadData<Array<Movie>>) {
  return {
    type: UPCOMING_MOVIES,
    movies
  };
}

export function loadTopMovies (movies: ActionPayloadData<SearchResult<Movie[]>>) {
  return {
    type: TOP_MOVIES,
    movies
  };
}
export function loadPopularMovies (movies: ActionPayloadData<AllMoviesPayload>) {
  return {
    type: ALL_MOVIES,
    movies
  };
}

export function loadPlayingMovies (movies: ActionPayloadData<SearchResult<Movie[]>>) {
  return {
    type: PLAYING_MOVIES,
    movies
  };
}

export function takeMovieData (data: ActionPayloadData<MovieDetails>) {
  return {
    type: MOVIE_DATA,
    data
  };
}

export function takeEngMovieData (data: MovieDetails) {
  return {
    type: MOVIE_ENG_DATA,
    data
  };
}

export function clearMovieData () {
  return {
    type: CLEAR_MOVIE_DATA
  };
}

export function changeMoviePage (typeList: string) {
  return {
    type: CHANGE_MOVIES_PAGE,
    typeList
  };
}
