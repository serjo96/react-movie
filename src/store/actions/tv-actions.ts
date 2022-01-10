import { SearchResult, TvShow, TvShowDetails } from 'tmdb-typescript-api';
import {
  TV_DATA, CLEAR_TV_DATA, AIRING_TV, ALL_TV, ON_THE_AIR_TV, TOP_TV, TV_SEASON,
  CLEAR_TV_SEASON, TV_ENG_DATA, CHANGE_TV_PAGE
} from '~/store/constants';
import ActionPayloadData from '~/core/types/ActionPayloadData';

type AllTvPayload = SearchResult<TvShow[]> & {sortByDate: string}

export function takeTvData (TVdata: ActionPayloadData<TvShowDetails>) {
  return {
    type: TV_DATA,
    TVdata
  };
}

export function takeEngTvData (data: ActionPayloadData<TvShowDetails>) {
  return {
    type: TV_ENG_DATA,
    data
  };
}

export function clearTvData () {
  return {
    type: CLEAR_TV_DATA
  };
}

export function loadAiringTV (TV: ActionPayloadData<SearchResult<TvShow[]>>) {
  return {
    type: AIRING_TV,
    TV
  };
}

export function loadTopTV (TV: ActionPayloadData<SearchResult<TvShow[]>>) {
  return {
    type: TOP_TV,
    TV
  };
}
export function loadPopularTV (TV: ActionPayloadData<AllTvPayload>) {
  return {
    type: ALL_TV,
    TV
  };
}

export function loadOnTheAirTV (TV: ActionPayloadData<SearchResult<TvShow[]>>) {
  return {
    type: ON_THE_AIR_TV,
    TV
  };
}

export function loadSeasonTV (TV: ActionPayloadData<SearchResult<TvShow[]>>) {
  return {
    type: TV_SEASON,
    TV
  };
}

export function clearTvSeason () {
  return {
    type: CLEAR_TV_SEASON
  };
}

export function changeMediaPage () {
  return {
    type: CHANGE_TV_PAGE
  };
}
