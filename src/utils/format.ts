// TODO: to refactoring
import { Genre } from '~/core/types/genres';

export function declOfNum (number: number, titles: [string, string, string]) {
  return titles[(number % 10 === 1 && number % 100 !== 11) ? 0 : number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20) ? 1 : 2];
}

export function formatTime (minutes: number): string {
  const m = minutes % 60;
  const hours = (minutes - m) / 60;
  return hours.toString() + ' ' + declOfNum(hours, ['час', 'часа', 'часов']) + ' ' + (m < 10 ? '0' : '') + m.toString();
}

export function calculationTime (min: number) {
  const minutes = min % 60;
  const hours = (min - minutes) / 60;
  return {
    minutes,
    hours
  };
}

export function capitalizeFirstLetter (string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function friendlyUrl (url: string): string {
  return url.replace(/\s+/g, '_').toLowerCase();
}

export function friendlyName (name: string): string {
  return name.replace(/_/g, ' ');
}

export function friendlyData (string: string): string {
  return string.replace(/-/g, '.').toLowerCase();
}

export function kFormatter (count: number): number | string {
  return count > 999 ? (count / 1000).toFixed(1) + 'k' : count;
}

export function urlRusLat (str: string): string {
  str = str.toLowerCase();
  const cyr2latChars = [
    ['а', 'a'], ['б', 'b'], ['в', 'v'], ['г', 'g'],
    ['д', 'd'], ['е', 'e'], ['ё', 'yo'], ['ж', 'zh'], ['з', 'z'],
    ['и', 'i'], ['й', 'y'], ['к', 'k'], ['л', 'l'],
    ['м', 'm'], ['н', 'n'], ['о', 'o'], ['п', 'p'], ['р', 'r'],
    ['с', 's'], ['т', 't'], ['у', 'u'], ['ф', 'f'],
    ['х', 'h'], ['ц', 'c'], ['ч', 'ch'], ['ш', 'sh'], ['щ', 'shch'],
    ['ъ', ''], ['ы', 'y'], ['ь', ''], ['э', 'e'], ['ю', 'yu'], ['я', 'ya'],

    ['А', 'A'], ['Б', 'B'], ['В', 'V'], ['Г', 'G'],
    ['Д', 'D'], ['Е', 'E'], ['Ё', 'YO'], ['Ж', 'ZH'], ['З', 'Z'],
    ['И', 'I'], ['Й', 'Y'], ['К', 'K'], ['Л', 'L'],
    ['М', 'M'], ['Н', 'N'], ['О', 'O'], ['П', 'P'], ['Р', 'R'],
    ['С', 'S'], ['Т', 'T'], ['У', 'U'], ['Ф', 'F'],
    ['Х', 'H'], ['Ц', 'C'], ['Ч', 'CH'], ['Ш', 'SH'], ['Щ', 'SHCH'],
    ['Ъ', ''], ['Ы', 'Y'],
    ['Ь', ''],
    ['Э', 'E'],
    ['Ю', 'YU'],
    ['Я', 'YA'],

    ['a', 'a'], ['b', 'b'], ['c', 'c'], ['d', 'd'], ['e', 'e'],
    ['f', 'f'], ['g', 'g'], ['h', 'h'], ['i', 'i'], ['j', 'j'],
    ['k', 'k'], ['l', 'l'], ['m', 'm'], ['n', 'n'], ['o', 'o'],
    ['p', 'p'], ['q', 'q'], ['r', 'r'], ['s', 's'], ['t', 't'],
    ['u', 'u'], ['v', 'v'], ['w', 'w'], ['x', 'x'], ['y', 'y'],
    ['z', 'z'],

    ['A', 'A'], ['B', 'B'], ['C', 'C'], ['D', 'D'], ['E', 'E'],
    ['F', 'F'], ['G', 'G'], ['H', 'H'], ['I', 'I'], ['J', 'J'], ['K', 'K'],
    ['L', 'L'], ['M', 'M'], ['N', 'N'], ['O', 'O'], ['P', 'P'],
    ['Q', 'Q'], ['R', 'R'], ['S', 'S'], ['T', 'T'], ['U', 'U'], ['V', 'V'],
    ['W', 'W'], ['X', 'X'], ['Y', 'Y'], ['Z', 'Z'],

    [' ', '_'], ['0', '0'], ['1', '1'], ['2', '2'], ['3', '3'],
    ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8'], ['9', '9'],
    ['-', '-']

  ];
  let newStr = '';

  for (let i = 0; i < str.length; i++) {
    const ch = str.charAt(i);
    let newCh = '';
    cyr2latChars.forEach((string) => {
      if (ch === string[0]) {
        newCh = string[1];
      }
    });
    newStr += newCh;
  }
  if (newStr.length === 0 || newStr === '__') {
    newStr = 'media';
  }
  return newStr.replace(/-/g, '_').replace(/[_]{2,}/gim, '_').replace(/\n/gim, '');
}

export function formattingGenres ({ movie, tv }: {movie: Genre[]; tv: Genre[]}) {
  const hashObj: {[key: number | string]: string} = {
    0: 'Все жанры'
  };
  const concatArr = movie.concat(tv);
  concatArr.forEach((item) => {
    hashObj[item.id] = capitalizeFirstLetter(item.name);
  });

  const allGenres = [{ id: 0, name: 'Все жанры' }];

  const moviesGenres = movie.map(i => {
    const result = {
      ...i,
      name: capitalizeFirstLetter(i.name)
    };
    allGenres.push(result);
    return result;
  });

  moviesGenres.unshift({ id: 0, name: 'Все жанры' });

  const tvGenres = tv.map(i => {
    const result = {
      ...i,
      name: capitalizeFirstLetter(i.name)
    };
    allGenres.push(result);
    return result;
  });

  // TODO: check if 0 id is necessary;
  tvGenres.unshift({ id: 0, name: 'Все жанры' });

  return {
    genresHash: hashObj,
    arrGenres: {
      all: allGenres,
      movie: moviesGenres,
      tv: tvGenres
    }
  };
}

export const firstOrderObjectValue = <T>(key: string | number, object: T): T => ({ [key]: undefined, ...object });
