import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const allPlacesSlice = createSlice({
  name: 'allPlaces',
  initialState,
  reducers: {
    loadAllPlaces: (state, action) => {
      state.value = action.payload;
    }
  
  },
});

export const { loadAllPlaces } = allPlacesSlice.actions;
export default allPlacesSlice.reducer;