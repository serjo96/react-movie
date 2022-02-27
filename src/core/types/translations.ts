export interface Translations {
  translations: Translation[];
}

export interface Translation {
  iso31661: string;
  iso6391: string;
  name: string;
  englishName: string;
  data: Data;
}

export interface Data {
  name: string;
  overview: string;
  homepage: string;
  tagline: string;
}
