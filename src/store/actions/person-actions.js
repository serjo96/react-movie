import { PERSON_DATA, CLEAR_PERSON_DATA } from '../constants';

export function loadPeople (person) {
  return {
    type: PERSON_DATA,
    person
  };
}

export function clearPersonData () {
  return {
    type: CLEAR_PERSON_DATA
  };
}
