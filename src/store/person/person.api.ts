import { createAsyncThunk } from '@reduxjs/toolkit';
import oldClient from '~/core/api/OldClient';
import { PersonDetails } from '~/core/types/perosn-details';

export interface PersonRespData {
  isSuccessful: boolean;
  data: PersonDetails;
}

export const getPersonDetails = createAsyncThunk<PersonRespData, string>(
  'person/getPersonDetails',
  async (id: string) => {
    const { data, isSuccessRequest } = await oldClient.get(`person/${id}`,
      {
        language: 'ru-RU',
        include_image_language: 'ru,null',
        append_to_response: 'movie_credits,images,tv_credits,combined_credits,external_ids,images,tagged_images,latest'
      }
    );

    return { data, isSuccessful: isSuccessRequest };
  });
