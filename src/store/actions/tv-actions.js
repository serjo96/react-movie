import {
  TV_DATA, CLEAR_TV_DATA, AIRING_TV, ALL_TV, ON_THE_AIR_TV, TOP_TV, TV_SEASON,
  CLEAR_TV_SEASON, TV_ENG_DATA, CHANGE_TV_PAGE
} from './../constants';

export function takeTvData (TVdata) {
  return {
    type: TV_DATA,
    TVdata
  };
}

export function takeEngTvData (data) {
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

export function loadAiringTV (TV) {
  return {
    type: AIRING_TV,
    TV
  };
}

export function loadTopTV (TV) {
  return {
    type: TOP_TV,
    TV
  };
}
export function loadPopularTV (TV) {
  return {
    type: ALL_TV,
    TV
  };
}

export function loadOnTheAirTV (TV) {
  return {
    type: ON_THE_AIR_TV,
    TV
  };
}

export function loadSeasonTV (TV) {
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

export function changeMediaPage (typeList) {
  return {
    type: CHANGE_TV_PAGE,
    typeList
  };
}
