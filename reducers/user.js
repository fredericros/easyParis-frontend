import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { token: null, username: null, signinError: null, signupError: null },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value.token = action.payload.token;
            state.value.username = action.payload.username;
            state.value.signupError = action.payload.signupError;
            state.value.signinError = action.payload.signinError;
        },
        logout: (state) => {
            state.value.token = null;
            state.value.username = null;
            state.value.signupError = null;
            state.value.signinError = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;