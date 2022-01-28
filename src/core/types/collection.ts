export declare class Collection {
  id: number;
  backdropPath: string;
  overview: string;
  name: string;
  posterPath: string | null;
  parts: Parts[];
}

export declare class Parts {
  adult: boolean;
  backdropPath: string;
  genreIds: number[];
  id: number;
  title: string;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}
