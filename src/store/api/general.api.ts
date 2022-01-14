import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

import {
  takeGenres,
  takeEngMedia,
  takeKeywordsMovies
} from '../actions/general-actions';
import {
  loadPlayingMovies,
  loadPopularMovies,
  loadTopMovies,
  loadUpcomingMovies
} from '~/store/actions/movies-actions';
import oldClient from '~/core/api/OldClient';

export function onLoadMainPage (): ThunkAction<void, unknown, unknown, AnyAction> {
  return dispatch => {
    oldClient.get('movie/upcoming',
      {
        language: 'ru-RU',
        page: 1,
        region: 'RU'
      }
    ).then(response => {
      dispatch(loadUpcomingMovies({ data: response.data, status: response.isSuccessRequest }));
    });

    oldClient.get('movie/top_rated',
      {
        language: 'ru-RU',
        page: 1,
        region: 'RU'
      }
    ).then(response => {
      dispatch(loadTopMovies({ data: response.data, status: response.isSuccessRequest }));
    });

    oldClient.get('movie/popular',
      {
        language: 'ru-RU',
        page: 1,
        region: 'RU'
      }
    ).then(response => {
      dispatch(loadPopularMovies({ data: response.data, status: response.isSuccessRequest }));
    });

    oldClient.get('movie/now_playing',
      {
        language: 'ru-RU',
        page: 1,
        region: 'RU'
      }
    ).then(response => {
      dispatch(loadPlayingMovies({ data: response.data, status: response.isSuccessRequest }));
    });
  };
}

export function getGenresList (): ThunkAction<void, unknown, unknown, AnyAction> {
  return async dispatch => {
    const [genresMovie, genresTV] = await oldClient.all([
      oldClient.get('genre/movie/list',
        {
          language: 'ru-RU'
        }),
      oldClient.get('genre/tv/list',
        {
          language: 'ru-RU'
        })
    ]);
    return dispatch(takeGenres({ movie: genresMovie.data.genres, tv: genresTV.data.genres }));
  };
}

export function onLoadEngMedia (id: string, type: string): ThunkAction<void, unknown, unknown, AnyAction> {
  return async (dispatch) => {
    const { data } = await oldClient.get(`${type}/${id}`,
      {
        language: 'en-US',
        include_image_language: 'ru,null',
        append_to_response: 'credits,images,videos,recommendations,reviews,lists,keywords,release_dates'
      }
    );
    const response = Object.assign({ ...data, typeResponse: type });
    dispatch(takeEngMedia(response));
  };
}
