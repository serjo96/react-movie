import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GeneralState = {
  isShowNav: boolean;
}

const initialState: GeneralState = {
  isShowNav: false
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setShowNav: (state, action: PayloadAction<boolean>) => {
      state.isShowNav = action.payload;
    }
  }
});

export const {setShowNav} = generalSlice.actions;
