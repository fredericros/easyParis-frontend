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
    },
    likePlace: (state, action) => {
      const index = state.value.findIndex(place => place._id === action.payload.placeId);
      const isLiked = state.value[index].likes.some(e => e.username === action.payload.username);

      if (isLiked) {
        state.value[index].likes = state.value[index].likes.filter(e => e.username !== action.payload.username);
      } else {
        state.value[index].likes.push({ username: action.payload.username });
      }
    },
    reviewPlace: (state, action) => {
      const index = state.value.findIndex(place => place._id === action.payload.placeId);
      const isReviewed = state.value[index].reviews.some(e => e.author.username === action.payload.username);

      if (isReviewed) {
        state.value[index].reviews = state.value[index].reviews.filter(e => e.author.username !== action.payload.username);
      } else {
        state.value[index].reviews.push({ author: {username: action.payload.username}, content: action.payload.content, createdAt: action.payload.createdAt });
      } 
    }
  
  },
});

export const { loadAllPlaces, likePlace, reviewPlace } = allPlacesSlice.actions;
export default allPlacesSlice.reducer;