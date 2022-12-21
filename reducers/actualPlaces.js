import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

export const actualPlacesSlice = createSlice({
  name: 'actualPlaces',
  initialState,
  reducers: {
    loadActualPlace: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { loadActualPlace } = actualPlacesSlice.actions;
export default actualPlacesSlice.reducer;