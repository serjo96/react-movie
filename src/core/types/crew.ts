export declare class Crew {
  id: number;
  adult: boolean;
  gender: number | null;
  knownForDepartment: string;
  name: string;
  originalName: string;
  popularity: number;
  profilePath: string | null;
  creditId: string;
  department: CrewDepartment;
  job: CrewJob;
}

export enum CrewJob {
  DIRECTOR = 'Director',
  PRODUCER = 'Producer',
  MUSIC = 'Music',
  ORIGINAL_MUSIC_COMPOSER = 'Original Music Composer',
  DIRECTOR_OF_PHOTOGRAPHY = 'Director of Photography'
}

export enum CrewDepartment {
  WRITING = 'Writing',
  ART = 'Art'
}
