import { Images } from '~/core/types/images';
import { Genre } from '~/core/types/genres';
import { Language, OriginalLanguage } from '~/core/types/language';
import { Company } from '~/core/types/company';
import { Country } from '~/core/types/country';
import { Collection } from '~/core/types/collection';
import { Keywords } from '~/core/types/keywords';
import { ListData } from '~/core/types/listData';
import { Videos } from '~/core/types/videos';
import { MovieListItem, MoviesListItem } from '~/core/types/movies';
import { Credits } from '~/core/types/credits';

export declare class MovieDetails {
  id: number;
  budget: number;
  imdbId: string | null;
  images: Images
  genres: Genre[];
  spokenLanguages: Language[];
  overview: string | null;
  posterPath: string | null;
  productionCompanies: Company[];
  productionCountries: Country[];
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  belongsToCollection: Collection | null;
  title: string;
  homepage: string | null;
  originalTitle: string;
  adult: boolean;
  releaseDate: string;
  keywords: Keywords;
  credits: Credits;
  lists: ListData<MovieListItem>;
  videos: Videos;
  recommendations: ListData<MoviesListItem>;
  backdropPath: string;
  originalLanguage: OriginalLanguage | string;
  popularity: number;
  voteCount: number;
  video: boolean;
  voteAverage: number;
}
