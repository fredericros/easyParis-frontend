import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    loadPlaces: (state, action) => {
      state.value = action.payload;
    },
    
  },
});

export const { loadPlaces } = placesSlice.actions;
export default placesSlice.reducer;