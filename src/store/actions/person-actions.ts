import { PersonDetails } from 'tmdb-typescript-api';
import ActionPayloadData from '~/core/types/actionPayloadData';
import { PERSON_DATA, CLEAR_PERSON_DATA } from '../constants';

export function loadPeople (person: ActionPayloadData<PersonDetails>) {
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
