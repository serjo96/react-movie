import { OriginalLanguage } from '~/core/types/language';
import { OriginCountry } from '~/core/types/country';
import { ListData } from '~/core/types/listData';

export type TvListResponseData = ListData<TvListItem>;

export interface TvListItem {
  backdropPath: string;
  firstAirDate: string;
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
