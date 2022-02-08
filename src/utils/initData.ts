import ActionPayloadData from '~/core/types/actionPayloadData';
import { ListData } from '~/core/types/listData';
import { Cast } from '~/core/types/cast';
import { Crew } from '~/core/types/crew';
import { Images } from '~/core/types/images';
import { ExternalIds } from '~/core/types/tvDetails';

export type CrewState = {
  director: Crew[],
  screenplay: Crew[],
  producer: Crew[],
  directorOfPhotography: Crew[],
  music: Crew[],
  art: Crew[]
}

export const initDataState = <T>(): ListData<T> => ({
  page: 1,
  results: [],
  totalResults: 0,
  totalPages: 0
});

export const initListData = <T>(): ActionPayloadData<ListData<T>> => ({
  isFetching: false,
  isSuccessful: true,
  data: initDataState<T>()
});

export const initCreditsState = (): {crew: CrewState} & {cast: Cast[]} => ({
  cast: [],
  crew: {
    director: [],
    screenplay: [],
    producer: [],
    directorOfPhotography: [],
    music: [],
    art: []
  }
});

export const initImagesState = (): Images => ({
  backdrops: [],
  posters: [],
  logos: []
});

export const initExternalIds = (): ExternalIds => ({
  imdbId: '',
  freebaseId: '',
  freebaseMid: '',
  tvdbId: 0,
  tvrageId: 0,
  facebookId: '',
  instagramId: '',
  twitterId: ''
});
