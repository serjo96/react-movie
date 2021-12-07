export function isMatching (full, chunk) {
  full = full.toLowerCase();
  chunk = chunk.toLowerCase();
  return full.substr(0, chunk.length) === chunk;
}

export function sortSeasons (a, b) {
  if (a.season_number === 0) return 1;
  if (b.season_number === 0) return -1;
  if (new Date(a.season_number) === new Date(b.season_number)) return 0;
  return new Date(a.season_number) < new Date(b.season_number) ? -1 : 1;
}

export const chunkArr = (arr, chunkSize) => {
  const groups = []; let i;
  for (i = 0; i < arr.length; i += chunkSize) {
    groups.push(arr.slice(i, i + chunkSize));
  }
  return groups;
};
