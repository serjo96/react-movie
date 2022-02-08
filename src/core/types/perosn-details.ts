import { MediaType } from '~/core/types/media-type';
import { OriginalLanguage } from '~/core/types/language';
import { ExternalIds } from '~/core/types/tvDetails';
import { Image } from '~/core/types/images';
import { Crew } from '~/core/types/crew';

export interface PersonDetails {
  adult: boolean;
  alsoKnownAs: string[];
  biography: string;
  birthday: string;
  deathday: null;
  gender: number;
  homepage: null;
  id: number;
  imdbId: string;
  knownForDepartment: string;
  name: string;
  placeOfBirth: string;
  popularity: number;
  profilePath: string;
  movieCredits: MovieCredits;
  images: {
    profiles: Image[];
  };
  tvCredits: TvCredits;
  combinedCredits: CombinedCredits;
  externalIds: ExternalIds;
  taggedImages: TaggedImages;
}

export interface CombinedCredits {
  cast: CombinedCreditsCast[];
  crew: Crew[];
}

export interface CombinedCreditsCast {
  adult?: boolean;
  backdropPath: null | string;
  genreIds: number[];
  id: number;
  originalLanguage: OriginalLanguage;
  originalTitle?: string;
  overview: string;
  posterPath: null | string;
  releaseDate?: string;
  title?: string;
  video?: boolean;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  character: string;
  creditId: string;
  order?: number;
  mediaType: MediaType;
  name?: string;
  originalName?: string;
  originCountry?: string[];
  firstAirDate?: string;
  episodeCount?: number;
}

export interface MovieCredits {
  cast: MovieCreditsCast[];
  crew: Crew[];
}

export interface MovieCreditsCast {
  adult: boolean;
  backdropPath: null | string;
  genreIds: number[];
  id: number;
  originalLanguage: OriginalLanguage;
  originalTitle: string;
  overview: string;
  posterPath: null | string;
  releaseDate: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  character: string;
  creditId: string;
  order: number;
}

export interface TaggedImages {
  page: number;
  results: TaggedImage[];
  totalPages: number;
  totalResults: number;
}

export interface TaggedImage {
  aspectRatio: number;
  filePath: string;
  height: number;
  id: string;
  iso6391: null;
  voteAverage: number;
  voteCount: number;
  width: number;
  imageType: string;
  media: Media;
  mediaType: string;
}

export interface Media {
  airDate: Date;
  episodeNumber: number;
  id: number;
  name: string;
  overview: string;
  productionCode: string;
  seasonNumber: number;
  showId: number;
  stillPath: string;
  voteAverage: number;
  voteCount: number;
}

export interface PersonCrew {
  overview: string;
  voteCount: number;
  backdropPath: null | string;
  name: string;
  genreIds: number[];
  voteAverage: number;
  firstAirDate: string;
  originalLanguage: OriginalLanguage;
  posterPath: null | string;
  originalName: string;
  originCountry: string[];
  id: number;
  popularity: number;
  creditId: string;
  department?: string;
  episodeCount: number;
  job?: string;
  mediaType?: MediaType;
  character?: string;
}

export interface TvCredits {
  cast: PersonCrew[];
  crew: Crew[];
}
