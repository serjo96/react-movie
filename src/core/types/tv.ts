import { OriginalLanguage } from '~/core/types/language';
import { OriginCountry } from '~/core/types/country';
import { ListData } from '~/core/types/listData';
import { Credits } from '~/core/types/credits';
import { Images } from '~/core/types/images';
import { Videos } from '~/core/types/videos';
import { Cast } from '~/core/types/cast';

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

export interface TvSeason {
  id: string;
  airDate: string;
  episodes: Episode[];
  name: string;
  overview: string;
  tvSeasonId: number;
  posterPath: string;
  seasonNumber: number;
  credits: Credits;
  images: Images;
  videos: Videos;
}

export interface Episode {
  airDate: string;
  episodeNumber: number;
  crew: Cast[];
  guestStars: Cast[];
  id: number;
  name: string;
  overview: string;
  productionCode: string;
  seasonNumber: number;
  stillPath: string;
  voteAverage: number;
  voteCount: number;
}
