import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const filteredPlacesSlice = createSlice({
  name: 'filteredPlaces',
  initialState,
  reducers: {
    loadfilteredPlaces: (state, action) => {
      state.value = action.payload;
    },
    likePlace: (state, action) => {
        const index = state.value.findIndex(place => place._id === action.payload.placeId);
        const isLiked = state.value[index].likes.some(e => e.username === action.payload.username);
  
        if (isLiked) {
          state.value[index].likes = state.value[index].likes.filter(e => e.username !== action.payload.username);
        } else {
          state.value[index].likes.push({ username: action.payload.username });
        }
      }
  
  },
});

export const { loadfilteredPlaces, likePlace } = filteredPlacesSlice.actions;
export default filteredPlacesSlice.reducer;