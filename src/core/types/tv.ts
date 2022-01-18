import { OriginalLanguage } from '~/core/types/language';
import { OriginCountry } from '~/core/types/country';

export interface TvListItem {
  backdropPath: string;
  firstAirDate: Date;
  genreIds: number[];
  id: number;
  name: string;
  originCountry: OriginCountry[];
  originalLanguage: OriginalLanguage;
  originalName: string;
  overview: string;
  popularity: number;
  posterPath: string;
  voteAverage: number;
  voteCount: number;
}
