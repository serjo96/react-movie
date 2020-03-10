import axios from 'axios';
import { takeGenres, takeEngMedia, takeKeywordsMovies } from './../actions/general-actions';
import { loadPlayingMovies, loadPopularMovies, loadTopMovies, loadUpcomingMovies } from './../actions/movies-actions';

export function onLoadMainPage () {
  return (dispatch) => {
    axios.get('https://api.themoviedb.org/3/movie/upcoming',
      {
        params: {
          api_key: '5a1d310d575e516dd3c547048eb7abf1',
          language: 'ru-RU',
          page: 1,
          region: 'RU'
        }
      }
    ).then(response => {
      dispatch(loadUpcomingMovies({ data: response.data, status: response.status === 200 }));
    });

    axios.get('https://api.themoviedb.org/3/movie/top_rated',
      {
        params: {
          api_key: '5a1d310d575e516dd3c547048eb7abf1',
          language: 'ru-RU',
          page: 1,
          region: 'RU'
        }
      }
    ).then(response => {
      dispatch(loadTopMovies({ data: response.data, status: response.status === 200 }));
    });

    axios.get('https://api.themoviedb.org/3/movie/popular',
      {
        params: {
          api_key: '5a1d310d575e516dd3c547048eb7abf1',
          language: 'ru-RU',
          page: 1,
          region: 'RU'
        }
      }
    ).then(response => {
      dispatch(loadPopularMovies({ data: response.data, status: response.status === 200 }));
    });

    axios.get('https://api.themoviedb.org/3/movie/now_playing',
      {
        params: {
          api_key: '5a1d310d575e516dd3c547048eb7abf1',
          language: 'ru-RU',
          page: 1,
          region: 'RU'
        }
      }
    ).then(response => {
      dispatch(loadPlayingMovies({ data: response.data, status: response.status === 200 }));
    });
  };
}

export function onGeneres () {
  return (dispatch) => {
    axios.all([
      axios.get('https://api.themoviedb.org/3/genre/movie/list',
        {
          params: {
            api_key: '5a1d310d575e516dd3c547048eb7abf1',
            language: 'ru-RU'
          }
        }),
      axios.get('https://api.themoviedb.org/3/genre/tv/list',
        {
          params: {
            api_key: '5a1d310d575e516dd3c547048eb7abf1',
            language: 'ru-RU'
          }
        })
    ]).then(axios.spread((genresMovie, genresTV) => {
      dispatch(takeGenres({ movie: genresMovie.data.genres, tv: genresTV.data.genres }));
    }));
  };
}

export function keywordsReq (id, type, page = 1) {
  return (dispatch) => {
    axios.all([
      axios.get(`https://api.themoviedb.org/3/discover/${type}`,
        {
          params: {
            api_key: '5a1d310d575e516dd3c547048eb7abf1',
            language: 'ru-RU',
            with_keywords: id,
            page: page,
            include_adult: true
          }
        }),
      axios.get(`https://api.themoviedb.org/3/discover/${type}`,
        {
          params: {
            api_key: '5a1d310d575e516dd3c547048eb7abf1',
            language: 'ru-RU',
            with_keywords: id,
            page: page + 1,
            include_adult: true
          }
        })
    ]).then(axios.spread((pageOne, pageTwo) => {
      let concatPages;
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
      dispatch(takeKeywordsMovies({ data: concatPages, status: { pageOne: pageOne.status === 200, pageTwo: pageTwo.status === 200 } }));
    }));
  };
}

export function onLoadEngMedia (id, type) {
  return (dispatch) => {
    axios.get(`https://api.themoviedb.org/3/${type}/${id}`,
      {
        params: {
          api_key: '5a1d310d575e516dd3c547048eb7abf1',
          language: 'en-US',
          include_image_language: 'ru,null',
          append_to_response: 'credits,images,videos,recommendations,reviews,lists,keywords,release_dates'
        }
      }
    ).then(res => {
      const response = Object.assign({ ...res.data, typeResponse: type });
      dispatch(takeEngMedia(response));
    });
  };
}
