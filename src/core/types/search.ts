import { MediaType } from '~/core/types/media-type';
import { OriginalLanguage } from '~/core/types/language';

export interface SearchResultItem {
  adult?: boolean;
  backdropPath: null | string;
  genreIds: number[];
  id: number;
  mediaType: MediaType;
  originalLanguage: OriginalLanguage;
  originalTitle?: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate?: Date;
  title?: string;
  video?: boolean;
  voteAverage: number;
  voteCount: number;
  firstAirDate?: Date;
  name?: string;
  originCountry?: string[];
  originalName?: string;
}
