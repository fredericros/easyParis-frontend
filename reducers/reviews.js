import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {allReviews:[], myReview:[]}
};

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        loadReviews: (state, action) => {
            state.value.allReviews = action.payload;
        },
        deleteReview: (state, action) => {
            state.value.allReviews = state.value.allReviews.filter(review => !(review.place._id === action.payload.placeId && review.author.username === action.payload.username));
        },
        loadMyReview: (state, action) => {
            state.value.myReview = action.payload;
        },
        deleteMyReview: (state, action) => {
            state.value.myReview = []
        },
    },
});

export const { loadReviews, deleteReview, loadMyReview, deleteMyReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;