import { Collection } from '~/core/types/collection';
import { MovieCreditsCast, PersonCrew } from '~/core/types/perosn-details';
import { MoviesListItem } from '~/core/types/movies';
import { TvListItem } from '~/core/types/tv';

export function sortCollectionItems (collection: Collection['parts']) {
  return [...collection].sort((a, b) => {
    if (!a.releaseDate) return 1;
    if (!b.releaseDate) return -1;
    if (new Date(a.releaseDate) === new Date(b.releaseDate)) return 0;
    return new Date(a.releaseDate) < new Date(b.releaseDate) ? -1 : 1;
  });
}

export function sortMoviesItems (collection: MovieCreditsCast[]) {
  return [...collection].sort((a, b) => {
    return +new Date(a.releaseDate) - +new Date(b.releaseDate);
  });
}

export function sortTvShows (collection: Array<PersonCrew>) {
  return [...collection].sort((a, b) => +new Date(a.firstAirDate) - +new Date(b.firstAirDate));
}

export const sortBestMediaItem = (movies: Array<MovieCreditsCast | PersonCrew | TvListItem | MoviesListItem>) => [...movies].sort((a, b) => b.voteCount - a.voteCount || b.voteAverage - a.voteAverage);
