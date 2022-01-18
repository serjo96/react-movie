import { OriginalLanguage } from '~/core/types/language';
import { CreatedBy, Credits } from '~/core/types/credits';
import { Genre } from '~/core/types/genres';
import { Keywords } from '~/core/types/keywords';
import { Images } from '~/core/types/images';
import { Translations } from '~/core/types/translations';
import { ListData } from '~/core/types/listData';

export interface TvDetails {
  adult: boolean;
  backdropPath: string;
  createdBy: CreatedBy[];
  episodeRunTime: number[];
  firstAirDate: Date;
  genres: Genre[];
  homepage: string;
  id: number;
  inProduction: boolean;
  languages: OriginalLanguage[];
  lastAirDate: Date;
  lastEpisodeToAir: TEpisodeToAir;
  name: string;
  nextEpisodeToAir: TEpisodeToAir;
  networks: Network[];
  numberOfEpisodes: number;
  numberOfSeasons: number;
  originCountry: string[];
  originalLanguage: OriginalLanguage;
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
  keywords: Keywords;
  recommendations: ListData<RecommendationsResult>;
  screenedTheatrically: ContentRatings;
  similar: ListData<RecommendationsResult>;
  translations: Translations;
  videos: ContentRatings;
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

export interface TEpisodeToAir {
  airDate: Date;
  episodeNumber: number;
  id: number;
  name: string;
  overview: string;
  productionCode: string;
  seasonNumber: number;
  stillPath: null;
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

export interface RecommendationsResult {
  adult: boolean;
  backdropPath: string;
  genreIds: number[];
  id: number;
  mediaType?: MediaType;
  name: string;
  originCountry: string[];
  originalLanguage: OriginalLanguage;
  originalName: string;
  overview: string;
  popularity: number;
  posterPath: null | string;
  firstAirDate: Date;
  voteAverage: number;
  voteCount: number;
}

export enum MediaType {
  Tv = 'tv',
}

export interface Season {
  airDate: Date;
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
