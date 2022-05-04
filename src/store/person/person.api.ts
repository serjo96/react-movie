import { createAsyncThunk } from '@reduxjs/toolkit';
import oldClient from '~/core/api/OldClient';
import { PersonDetails } from '~/core/types/perosn-details';
import { Languages } from '~/store/config/config.slice';

export interface PersonRespData {
  isSuccessful: boolean;
  data: PersonDetails;
}

export const getPersonDetails = createAsyncThunk<PersonRespData, {id: string, lang: Languages}>(
  'person/getPersonDetails',
  async ({ id, lang }, { rejectWithValue }) => {
    try {
      const { data, isSuccessRequest } = await oldClient.get(`person/${id}`,
        {
          include_image_language: `${lang},null`,
          append_to_response: 'movie_credits,images,tv_credits,combined_credits,external_ids,images,tagged_images,latest'
        }
      );

      return { data, isSuccessful: isSuccessRequest };
    } catch (error) {
      throw rejectWithValue(error);
    }
  });
