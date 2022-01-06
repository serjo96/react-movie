import { takeGenres, takeEngMedia, takeKeywordsMovies } from './../actions/general-actions';
import { loadPlayingMovies, loadPopularMovies, loadTopMovies, loadUpcomingMovies } from './../actions/movies-actions';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
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
      dispatch(loadUpcomingMovies({ data: response.data, status: response.status < 400 }));
    });

    oldClient.get('movie/top_rated',
      {
        language: 'ru-RU',
        page: 1,
        region: 'RU'
      }
    ).then(response => {
      dispatch(loadTopMovies({ data: response.data, status: response.status < 400 }));
    });

    oldClient.get('movie/popular',
      {
        language: 'ru-RU',
        page: 1,
        region: 'RU'
      }
    ).then(response => {
      dispatch(loadPopularMovies({ data: response.data, status: response.status < 400 }));
    });

    oldClient.get('movie/now_playing',
      {
        language: 'ru-RU',
        page: 1,
        region: 'RU'
      }
    ).then(response => {
      dispatch(loadPlayingMovies({ data: response.data, status: response.status < 400 }));
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

export function keywordsReq (id: string, type: string, page = 1): ThunkAction<void, unknown, unknown, AnyAction> {
  return async (dispatch) => {
    let concatPages;
    const [pageOne, pageTwo] = await oldClient.all([
      oldClient.get(`https://api.themoviedb.org/3/discover/${type}`,
        {
          language: 'ru-RU',
          with_keywords: id,
          page: page,
          include_adult: true
        }),
      oldClient.get(`https://api.themoviedb.org/3/discover/${type}`,
        {
          language: 'ru-RU',
          with_keywords: id,
          page: page + 1,
          include_adult: true
        })
    ]);

    if (pageOne.data.total_pages > 1) {
      concatPages = Object.assign({
        ...pageTwo.data,
        results: pageOne.data.results.concat(pageTwo.data.results),
        page: pageOne.data.page,
        searchType: { type: 'genres' }
      });
    } else {
      concatPages = pageOne.data;
    }

    dispatch(takeKeywordsMovies({ data: concatPages, status: { pageOne: pageOne.status < 400, pageTwo: pageTwo.status < 400 } }));
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
