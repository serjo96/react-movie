import { Cast } from '~/core/types/cast';
import { Crew } from '~/core/types/crew';

export declare class Credits {
  cast: Cast[];
  crew: Crew[];
}

export interface CreatedBy {
  id: number;
  creditId: string;
  name: string;
  gender: number;
  profilePath: string;
}
