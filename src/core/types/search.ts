import { MediaType } from '~/core/types/media-type';
import { OriginalLanguage } from '~/core/types/language';

export interface SearchResultItem {
  adult?: boolean;
  backdropPath: null | string;
  genreIds: number[];
  gender: number;
  id: number;
  mediaType: MediaType;
  originalLanguage: OriginalLanguage;
  originalTitle?: string;
  overview: string;
  popularity: number;
  posterPath: string;
  knownForDepartment: string;
  profilePath?: string;
  releaseDate?: string;
  title?: string;
  video?: boolean;
  voteAverage: number;
  voteCount: number;
  firstAirDate?: string;
  name?: string;
  originCountry?: string[];
  originalName?: string;
}
