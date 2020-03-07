import { loadUpcomingMovies, loadPopularMovies, loadPlayingMovies, loadTopMovies, takeEngMovieData, takeMovieData } from './../actions/movies-actions';
import * as axios from 'axios/index';

export function movieUpcoming (page = 1) {
  return (dispatch) => {
    axios.get('https://api.themoviedb.org/3/movie/upcoming',
      {
        params: {
          api_key: '5a1d310d575e516dd3c547048eb7abf1',
          language: 'ru-RU',
          page: page,
          region: 'RU'
        }
      }
    ).then(response => {
      dispatch(loadUpcomingMovies({ data: response.data, status: response.status === 200 }));
    });
  };
}

export function movieListAll (page = 1, genre, sortType = 'popularity.desc', date, region, adult = false) {
  let year = `${date}`;
  let singleYear;
  let rageDates;
  let startRangeDate;
  let endRangeDate;
  if (year && year.split('-').length > 1) {
	    rageDates = year.split('-');
    startRangeDate = rageDates[0] ? rageDates[0] : '';
    endRangeDate = rageDates[1];
  } else {
	    singleYear = date;
  }

  return (dispatch) => {
    axios.all([
      axios.get('https://api.themoviedb.org/3/discover/movie',
        {
          params: {
            api_key: '5a1d310d575e516dd3c547048eb7abf1',
            language: 'ru-RU',
            region: region,
            sort_by: sortType,
            with_genres: genre,
            primary_release_year: singleYear,
            'primary_release_date.gte': startRangeDate,
            'primary_release_date.lte': endRangeDate,
            page: page,
            include_adult: adult
          }
        }),
      axios.get('https://api.themoviedb.org/3/discover/movie',
        {
          params: {
            api_key: '5a1d310d575e516dd3c547048eb7abf1',
            language: 'ru-RU',
            region: region,
            sort_by: sortType,
            with_genres: genre,
            primary_release_year: singleYear,
            'primary_release_date.gte': startRangeDate,
            'primary_release_date.lte': endRangeDate,
            page: page + 1,
            include_adult: adult
          }
        })
    ]).then(axios.spread((pageOne, pageTwo) => {
      let concatPages;
      if (pageOne.data.total_pages > 1) {
        concatPages = Object.assign({
	                ...pageTwo.data,
          results: pageOne.data.results.concat(pageTwo.data.results),
	                page: pageOne.data.page,
	                sortByDate: year
        });
      } else {
        concatPages = pageOne.data;
      }
      dispatch(loadPopularMovies({ data: concatPages, status: pageOne.status === 200 && pageTwo.status === 200 }));
    }));
  };
}

export function movieListPlaying (page = 1) {
  return (dispatch) => {
    axios.all([
      axios.get('https://api.themoviedb.org/3/movie/now_playing',
        {
          params: {
            api_key: '5a1d310d575e516dd3c547048eb7abf1',
            language: 'ru-RU',
            page: page,
            region: 'RU'
          }
        }),
      axios.get('https://api.themoviedb.org/3/movie/now_playing',
        {
          params: {
            api_key: '5a1d310d575e516dd3c547048eb7abf1',
            language: 'ru-RU',
            page: page + 1,
            region: 'RU'
          }
        })
    ]).then(axios.spread((pageOne, pageTwo) => {
      let concatPages;
      if (pageOne.data.total_pages > 1) {
        concatPages = Object.assign({
	                ...pageTwo.data,
	                results: pageOne.data.results.concat(pageTwo.data.results),
	                page: pageOne.data.page
        });
      } else {
        concatPages = pageOne.data;
      }
      dispatch(loadPlayingMovies({ data: concatPages, status: pageOne.status === 200 && pageTwo.status === 200 }));
    }));
  };
}

export function movieListTop (page = 1) {
  return (dispatch) => {
    axios.all([
      axios.get('https://api.themoviedb.org/3/movie/top_rated',
        {
          params: {
            api_key: '5a1d310d575e516dd3c547048eb7abf1',
            language: 'ru-RU',
            page: page,
            region: 'RU'
          }
        }),
      axios.get('https://api.themoviedb.org/3/movie/top_rated',
        {
          params: {
            api_key: '5a1d310d575e516dd3c547048eb7abf1',
            language: 'ru-RU',
            page: page + 1,
            region: 'RU'
          }
        })
    ]).then(axios.spread((pageOne, pageTwo) => {
      let concatPages;
      if (pageOne.data.total_pages > 1) {
        concatPages = Object.assign({
	                ...pageTwo.data,
	                results: pageOne.data.results.concat(pageTwo.data.results),
	                page: pageOne.data.page
        });
      } else {
        concatPages = pageOne.data;
      }
      dispatch(loadTopMovies({ data: concatPages, status: pageOne.status === 200 && pageTwo.status === 200 }));
    }));
  };
}

export function onLoadMovie (id, lang = 'ru-RU') {
  return (dispatch) => {
    axios.get('https://api.themoviedb.org/3/movie/' + id,
      {
        params: {
          api_key: '5a1d310d575e516dd3c547048eb7abf1',
          language: lang,
          include_image_language: 'ru,null',
          append_to_response: 'credits,images,videos,recommendations,reviews,lists,keywords,release_dates'
        }
      }
    ).then(res => {
      if (res.data.belongs_to_collection) {
        axios.get('https://api.themoviedb.org/3/collection/' + res.data.belongs_to_collection.id,
          {
            params: {
              api_key: '5a1d310d575e516dd3c547048eb7abf1',
              language: lang
            }
          }
        ).then(response => {
          let data = Object.assign({ collection: response.data }, res.data);
          dispatch(takeMovieData({ data: data, status: response.status === 200 && res.status }));
        });
      } else {
        if (lang === 'ru-RU') {
          dispatch(takeMovieData({ data: res.data, status: res.status === 200 }));
        } else {
          dispatch(takeEngMovieData(res.data));
        }
      }
    });
  };
}
