import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum Languages {
  RU = 'ru-RU',
  EN = 'en-EN'
}

const initialState = {
  language: Languages.RU
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setLanguage: (state, { payload }: PayloadAction<Languages>) => {
      state.language = payload;
    }
  }
});

export const { setLanguage } = configSlice.actions;
