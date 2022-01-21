import { Collection } from '~/core/types/collection';

export function sortCollectionItems (collection: Collection['parts']) {
  return [...collection].sort((a, b) => {
    if (!a.releaseDate) return 1;
    if (!b.releaseDate) return -1;
    if (new Date(a.releaseDate) === new Date(b.releaseDate)) return 0;
    return new Date(a.releaseDate) < new Date(b.releaseDate) ? -1 : 1;
  });
}
