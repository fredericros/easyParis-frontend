import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
};

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        loadReview: (state, action) => {
            state.value = action.payload;
        },
        addReview: (state, action) => {
            state.value.unshift(action.payload);
        },
        deleteReview: (state, action) => {
            state.value = state.value.filter(review => review.author.username !== action.payload);
        },
    },
});

export const { loadReview, addReview, deleteReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;