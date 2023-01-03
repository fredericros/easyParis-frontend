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
    likeActualPlace: (state, action) => {
      const isLiked = state.value.likes.some(e => e.username === action.payload.username);
      if (isLiked) {
        state.value.likes = state.value.likes.filter(e => e.username !== action.payload.username);
      } else {
        state.value.likes.push({ username: action.payload.username });
      }
    },
    reviewActualPlace: (state, action) => {
      const isReviewed = state.value.reviews.some(e => e.author.username === action.payload.username);
      if (isReviewed) {
        state.value.reviews = state.value.reviews.filter(e => e.author.username !== action.payload.username);
      } else {
        state.value.reviews.push({ 
          author: {username: action.payload.username}, content: action.payload.content, createdAt: action.payload.createdAt });
      }
    }
  },
});

export const { loadActualPlace, likeActualPlace, reviewActualPlace } = actualPlacesSlice.actions;
export default actualPlacesSlice.reducer;