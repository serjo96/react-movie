import { createSlice } from '@reduxjs/toolkit';

export enum Languages {
  RU = 'ru-RU',
  EN = 'en-EN'
}

const initialState = {
  language: Languages.RU
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
});
