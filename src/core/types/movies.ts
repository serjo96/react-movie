import { OriginalLanguage } from '~/core/types/language';

export declare class MoviesListItem {
  adult: boolean;
  backdropPath: null | string;
  genreIds: number[];
  id: number;
  originalLanguage: OriginalLanguage;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: null | string;
  releaseDate: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}

/* Movie list */
export declare class MoviesList {
  page: number;
  results: Array<MoviesListItem>;
  totalResults: number;
  totalPages: number;
  dates?: {
    maximum: string;
    minimum: string;
  }
}

export declare class MovieListItem {
  description: string
  favoriteCount: number;
  id: number;
  itemCount: number;
  iso6391: string;
  listType: string;
  name: string;
  posterPath: string | null;
}

export enum MoviesListType {
  ALL = 'all',
  TOP = 'top',
  UPCOMING = 'upcoming',
  PLAYING = 'playing'
}
