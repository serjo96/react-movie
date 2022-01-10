import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

import oldClient from '~/core/api/OldClient';
import { loadPeople } from '~/store/actions/person-actions';

export function onLoadPerson (id: string): ThunkAction<void, unknown, unknown, AnyAction> {
  return async (dispatch) => {
    try {
      const { data, isSuccessRequest } = await oldClient.get(`person/${id}`,
        {
          language: 'ru-RU',
          include_image_language: 'ru,null',
          append_to_response: 'movie_credits,images,tv_credits,combined_credits,external_ids,images,tagged_images,latest'
        }
      );
      dispatch(loadPeople({ data: data, status: isSuccessRequest }));
    } catch (error) {

    }
  };
}
