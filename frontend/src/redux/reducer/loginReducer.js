import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isLoggedIn: false,
  isLoading: false,
  token: null,
  user: {
    id: null,
    username: null,
    role: null,
  },
  error: null,
  users: [],
};

const authSliceLogin = createSlice({
  name: 'authLogin',
  initialState,
  reducers: {
    loginRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      const { token, user } = action.payload;
      state.isAuthenticated = true;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.token = token;
      state.user = user;
      state.error = null;
    },
    loginFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.token = null;
      state.user = {
        id: null,
        username: null,
        role: null,
      };
      state.error = null;
    },
    fetchUsersRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload.users;
      state.error = null;
    },
    fetchUsersFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
} = authSliceLogin.actions;

export default authSliceLogin.reducer;
