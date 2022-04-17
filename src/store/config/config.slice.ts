import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from 'i18next';

export enum Languages {
  RU = 'ru-RU',
  EN = 'en-EN'
}

const initialState = {
  language: window.localStorage.getItem('i18nextLng') || i18n.language || Languages.EN
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
