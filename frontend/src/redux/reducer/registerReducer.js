import { createSlice } from '@reduxjs/toolkit';

const authSliceRegister = createSlice({
  name: 'register',
  initialState: {
    isLoading: false,
    token: null,
    user: {},
    error: null,
  },
  reducers: {
    registerRequest: (state) => {
      state.isLoading = true;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export default authSliceRegister.reducer;
