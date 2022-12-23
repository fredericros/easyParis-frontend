import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
};

export const likesSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        loadLike: (state, action) => {
            state.value = action.payload;
        },
        addRLike: (state, action) => {
            state.value.unshift(action.payload);
        },
        deleteLike: (state, action) => {
            state.value = state.value.filter(like => like._id !== action.payload);
        },
    },
});

export const { loadLike, addRLike, deleteLike } = likesSlice.actions;
export default likesSlice.reducer;