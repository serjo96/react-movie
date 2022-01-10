import { SEARCH_IN_PAGE, SEARCH_IN_HEADER, CLEAR_SEARCH, GENRES, SEARCH_KEYWORDS_MOVIES, SEARCH_RESET_FETCH, MEDIA_ENG_DATA } from './../constants';
import { capitalizeFirstLetter } from 'utils/format';
import update from 'react-addons-update';

export enum Languages {
  RU = 'ru-RU',
  EN = 'en-EN'
}

const initialState = {
  settings: {
    language: Languages.RU
  },
  SearchHeaderField: '',
  SearchHeaderResult: {
    isFetching: false,
    data: {
      page: 1,
      total_results: '',
      total_pages: '',
      results: []
    },
    status: {
      pageOne: 200,
      pageTwo: 200
    }
  },
  Genres: {
    isFetching: !!JSON.parse(window.localStorage.getItem('genres')),
    data: JSON.parse(window.localStorage.getItem('genres')) || null
  },
  KeywordsList: {
    isFetching: false,
    data: {
      page: 1,
      total_results: '',
      total_pages: '',
      results: []
    },
    status: {
      pageOne: 200,
      pageTwo: 200
    }
  },
  SearchPageResult: {
    isFetching: false,
    data: {
      querySearch: '',
      page: 1,
      total_results: '',
      total_pages: '',
      results: []
    },
    status: {
      pageOne: 200,
      pageTwo: 200
    }
  },
  EngDescription: {
    isFetching: false,
    tv: {
      0: { mame: '', id: '' }
    },
    movie: {
      0: { mame: '', id: '' }
    }
  }
};

export default function General (state = initialState, action) {
  switch (action.type) {
    case SEARCH_IN_PAGE:
      return update(state, {
        SearchPageResult: {
          $merge: {
            isFetching: true,
            data: action.results.data,
            status: action.results.status
          }
        }
      });

    case SEARCH_IN_HEADER:
      return update(state, {
        SearchHeaderResult: {
          $merge: {
            isFetching: true,
            data: action.querySearch
          }
        }
      });

    case CLEAR_SEARCH:
      return update(state, {
        $merge: { SearchField: '' }
      });

    case GENRES:
      const hashObj = {};
      const concatArr = action.genres.movie.concat(action.genres.tv);
      concatArr.forEach((item) => {
        hashObj[item.id] = capitalizeFirstLetter(item.name);
      });
      const allGenres = Object.keys(hashObj).map(key => { return { id: key, name: hashObj[key] }; });
      allGenres.unshift({ id: 0, name: 'Все жанры' });

      const moviesGenres = action.genres.movie.map(i => {
        return {
          ...i,
          name: capitalizeFirstLetter(i.name)
        };
      }
      );

      moviesGenres.unshift({ id: 0, name: 'Все жанры' });
      const tvGenres = action.genres.tv.map(i => {
        return {
          ...i,
          name: capitalizeFirstLetter(i.name)
        };
      }
      );

      window.localStorage.setItem('genres', JSON.stringify(
        {
          obj: hashObj,
          arr: {
            AllGenres: allGenres,
            movieGenres: moviesGenres,
            tvGenres: tvGenres
          }
        }
      ));
      return update(state, {
        Genres: {
          $merge: {
            isFetching: true,
            data: { obj: hashObj, arr: { AllGenres: allGenres, movieGenres: moviesGenres, tvGenres: tvGenres } }
          }
        }
      });

    case SEARCH_KEYWORDS_MOVIES:
      return update(state, {
        KeywordsList: {
          $merge: {
            isFetching: true,
            data: action.keywords.data,
            status: action.keywords.status
          }
        }
      });

    case SEARCH_RESET_FETCH:
      return update(state, {
        SearchPageResult: {
          $merge: {
            isFetching: true,
            ...state.SearchPageResult.data
          }
        }
      });

    case MEDIA_ENG_DATA:
      return update(state, {
        EngDescription: {
          $merge: {
            isFetching: true,
            [action.engData.typeResponse]: {
              ...state.EngDescription[action.engData.typeResponse],
              [action.engData.id]: {
                name: action.engData.name
                  ? action.engData.name
                  : action.engData.title,
                overview: action.engData.overview.length
                  ? action.engData.overview
                  : 'К сожалению описания на английском отсутвует.'
              }
            }
          }
        }
      });

    default:
      return state;
  }
}
