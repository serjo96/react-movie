import { createAsyncThunk } from '@reduxjs/toolkit';
import { TvListItem, TvListResponseData, TvSeason } from '~/core/types/tv';
import oldClient from '~/core/api/OldClient';
import ConcatPages from '~/utils/concatPages';
import { ListData } from '~/core/types/listData';
import { TvDetails } from '~/core/types/tvDetails';
import { Languages } from '~/store/config/config.slice';

export interface ReturnedTvShowsList {
  data: TvListResponseData;
  isSuccessful: boolean;
}

export interface TvRespData {
  isSuccessful: boolean;
  data: TvDetails
}
export interface TvSeasonRespData {
  isSuccessful: boolean;
  data: TvSeason
}

export interface TvListArgs {
  page?: number;
  genre?: number;
  sortBy?: string;
  date?: string;
  region?: string;
  language?: Languages;
}

export interface TvShowEngDataResp {
  isSuccessful: boolean;
  data: TvDetails['overview'];
}

// TODO: add filter by status show and by runtime
export const getTvShowsList = createAsyncThunk<ReturnedTvShowsList, TvListArgs | void>(
  'tv/getTvShowsList',
  async ({
    genre,
    date,
    region,
    sortBy = 'popularity.desc',
    page = 1
  }: TvListArgs = {
    sortBy: 'popularity.desc',
    page: 1
  }, { rejectWithValue }) => {
    let startRangeDate: string | undefined;
    let endRangeDate: string | undefined;
    const rangeData = date && date.split('-');
    if (date && rangeData.length > 1) {
      [startRangeDate, endRangeDate] = rangeData;
    }

    try {
      const [firstPage, secondPage] = await oldClient.all<ListData<TvListItem>>([
        oldClient.get('discover/tv',
          {
            sort_by: sortBy,
            with_genres: genre,
            first_air_date_year: date,
            watch_region: region,
            'first_air_date.gte': startRangeDate,
            'first_air_date.lte': endRangeDate,
            page: page
          }),
        oldClient.get('discover/tv',
          {
            sort_by: sortBy,
            with_genres: genre,
            watch_region: region,
            first_air_date_year: date,
            'first_air_date.gte': startRangeDate,
            'first_air_date.lte': endRangeDate,
            page: page + 1
          })
      ]);

      const concatPages = ConcatPages<TvListItem>({ firstPage, secondPage });
      return {
        data: { ...concatPages, sortByDate: date },
        isSuccessful: firstPage.isSuccessRequest && secondPage.isSuccessRequest
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const getAiringTvShows = createAsyncThunk<ReturnedTvShowsList, number | void>(
  'tvShows/getAiringTvShows',
  async (page = 1, { rejectWithValue }) => {
    try {
      const [firstPage, secondPage] = await oldClient.all<ListData<TvListItem>>([
        oldClient.get('tv/airing_today',
          {
            page: page,
            region: 'RU'
          }),
        oldClient.get('tv/airing_today',
          {
            page: (page as number) + 1,
            region: 'RU'
          })
      ]);
      const concatPages = ConcatPages<TvListItem>({ firstPage, secondPage });
      return {
        data: concatPages,
        isSuccessful: firstPage.isSuccessRequest && secondPage.isSuccessRequest
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const getTopTvShows = createAsyncThunk<ReturnedTvShowsList, number | void>(
  'tvShows/getTopTvShows',
  async (page = 1, { rejectWithValue }) => {
    try {
      const [firstPage, secondPage] = await oldClient.all<ListData<TvListItem>>([
        oldClient.get('tv/top_rated',
          {
            page: page,
            region: 'RU'
          }),
        oldClient.get('tv/top_rated',
          {
            page: (page as number) + 1,
            region: 'RU'
          })
      ]);
      const concatPages = ConcatPages<TvListItem>({ firstPage, secondPage });
      return {
        data: concatPages,
        isSuccessful: firstPage.isSuccessRequest && secondPage.isSuccessRequest
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const getOnTheAirTvShows = createAsyncThunk<ReturnedTvShowsList, number | void>(
  'tvShows/getOnTheAirTvShows',
  async (page = 1, { rejectWithValue }) => {
    try {
      const [firstPage, secondPage] = await oldClient.all<ListData<TvListItem>>([
        oldClient.get('tv/on_the_air',
          {
            page: page,
            region: 'RU'
          }),
        oldClient.get('tv/on_the_air',
          {
            page: (page as number) + 1,
            region: 'RU'
          })
      ]);
      const concatPages = ConcatPages<TvListItem>({ firstPage, secondPage });
      return {
        data: concatPages,
        isSuccessful: firstPage.isSuccessRequest && secondPage.isSuccessRequest
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const getTvShowData = createAsyncThunk<TvRespData, {id: number, lang: Languages}>(
  'tvShows/getTvShowDetail',
  async ({ id, lang }, { rejectWithValue }) => {
    try {
      const { data, isSuccessRequest } = await oldClient.get<TvDetails>(`tv/${id}`,
        {
          language: lang,
          include_image_language: `${lang},null`,
          append_to_response: 'content_ratings,credits,external_ids,images,keywords,recommendations,screened_theatrically,similar,translations,videos'
        }
      );
      return {
        data,
        isSuccessful: isSuccessRequest
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const getEngTvShowData = createAsyncThunk<TvShowEngDataResp, {id: number, lang?: Languages}>(
  'tvShows/getEngTvShowDetail',
  async ({ id, lang = Languages.EN }, { rejectWithValue }) => {
    try {
      const { data, isSuccessRequest } = await oldClient.get<TvDetails>(`tv/${id}`,
        {
          language: lang
        }
      );
      return {
        data: data.overview,
        isSuccessful: isSuccessRequest
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const getTvShowSeasons = createAsyncThunk<TvSeasonRespData, {id: number, season: number, lang: Languages}>(
  'tvShows/getTvShowSeasons',
  async ({ id, season, lang }) => {
    const { data, isSuccessRequest } = await oldClient.get<TvSeason>(`tv/${id}/season/${season}`,
      {
        include_image_language: `${lang},null`,
        append_to_response: 'credits, external_ids,images,videos'
      });
    return {
      data,
      isSuccessful: isSuccessRequest
    };
  }
);
