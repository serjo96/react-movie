import { OriginalLanguage } from '~/core/types/language';
import { CreatedBy, Credits } from '~/core/types/credits';
import { Genre } from '~/core/types/genres';
import { Keywords } from '~/core/types/keywords';
import { Images } from '~/core/types/images';
import { Translations } from '~/core/types/translations';
import { ListData } from '~/core/types/listData';
import { Videos } from '~/core/types/videos';
import { TvListItem } from '~/core/types/tv';

export interface TvDetails {
  adult: boolean;
  backdropPath: string;
  createdBy: CreatedBy[];
  episodeRunTime: number[];
  firstAirDate?: string;
  genres: Genre[];
  homepage: string;
  id: number;
  inProduction: boolean;
  languages: OriginalLanguage[];
  lastAirDate: string;
  lastEpisodeToAir: TvEpisodeToAir;
  name: string;
  nextEpisodeToAir: TvEpisodeToAir;
  networks: Network[];
  numberOfEpisodes: number;
  numberOfSeasons: number;
  originCountry: string[];
  originalLanguage: string;
  originalName: string;
  overview: string;
  popularity: number;
  posterPath: string;
  productionCompanies: Network[];
  productionCountries: ProductionCountry[];
  seasons: Season[];
  spokenLanguages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  voteAverage: number;
  voteCount: number;
  contentRatings: ContentRatings;
  credits: Credits;
  externalIds: ExternalIds;
  images: Images;
  keywords: {
    results: Keywords['keywords']
  };
  recommendations: ListData<TvListItem>;
  screenedTheatrically: ContentRatings;
  similar: ListData<TvListItem>;
  translations: Translations;
  videos: Videos;
}

export interface ContentRatings {
  results: ContentRatingsResult[];
}

export interface ContentRatingsResult {
  iso31661: string;
  rating: string;
}

export interface ExternalIds {
  imdbId: string;
  freebaseMid: string;
  freebaseId: string;
  tvdbId: number;
  tvrageId: number;
  facebookId: string;
  instagramId: string;
  twitterId: string;
}

export interface TvEpisodeToAir {
  airDate: string;
  episodeNumber: number;
  id: number;
  name: string;
  overview: string;
  productionCode: string;
  seasonNumber: number;
  stillPath: string;
  voteAverage: number;
  voteCount: number;
}

export interface Network {
  name: string;
  id: number;
  logoPath: null | string;
  originCountry: string;
}

export interface ProductionCountry {
  iso31661: string;
  name: string;
}

export interface Season {
  airDate: string;
  episodeCount: number;
  id: number;
  name: string;
  overview: string;
  posterPath: string;
  seasonNumber: number;
}

export interface SpokenLanguage {
  englishName: string;
  iso6391: OriginalLanguage;
  name: string;
}
