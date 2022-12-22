import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: null,
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
            state.value = state.value.filter(review => review._id !== action.payload);
        },
    },
});

export const { loadReview, addReview, deleteReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;