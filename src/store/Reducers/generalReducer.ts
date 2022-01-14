import update from 'react-addons-update';
import {Genre, Movie, TvShow} from 'tmdb-typescript-api';

import {
  GENRES,
  SEARCH_KEYWORDS_MOVIES,
  MEDIA_ENG_DATA
} from './../constants';
import { capitalizeFirstLetter } from '~/utils/format';

export enum Languages {
  RU = 'ru-RU',
  EN = 'en-EN'
}

export interface GenresData {
  movie: Array<Genre>,
  tv: Array<Genre>
}

interface GeneralState {
  settings: {
    language: Languages;
  };
  genres: {
    isFetching: boolean;
    data: GenresData | null
  };
  engDescription: {
    isFetching: boolean;
    tv: {
      [key: number| string]: {
        name: string;
        id: string;
      }
    };
    movie: {
      [key: number | string]: {
        name: string;
        id: string;
      }
    }
  }
}

const initialState: GeneralState = {
  settings: {
    language: Languages.RU
  },
  genres: {
    isFetching: !!JSON.parse(window.localStorage.getItem('genres')),
    data: JSON.parse(window.localStorage.getItem('genres')) || null
  },
  engDescription: {
    isFetching: false,
    tv: {
      0: { name: '', id: '' }
    },
    movie: {
      0: { name: '', id: '' }
    }
  }
};

export default function General (state = initialState, action) {
  switch (action.type) {
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
        genres: {
          $merge: {
            isFetching: true,
            data: { obj: hashObj, arr: { AllGenres: allGenres, movieGenres: moviesGenres, tvGenres: tvGenres } }
          }
        }
      });

    case MEDIA_ENG_DATA:
      return update(state, {
        engDescription: {
          $merge: {
            isFetching: true,
            [action.engData.typeResponse]: {
              ...state.engDescription[action.engData.typeResponse],
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
