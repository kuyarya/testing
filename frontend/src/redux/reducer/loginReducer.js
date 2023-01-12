import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//create async thunk
export const login = createAsyncThunk(
  'login/login',
  async (payload, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const response = await axios.post(
        'http://localhost:8080/login',
        payload,
        config
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const authSliceLogin = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
    isLoading: false,
    token: localStorage.getItem('token'),
    user: {},
    loginSuccess: false,
    loginError: null,
  },
  reducers: {
    //handling async actions
    [login.pending]: (state) => {
      state.isLoading = true;
      state.loginSuccess = false;
      state.loginError = null;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loginSuccess = true;
      state.isLoggedIn = true;
      localStorage.setItem('token', action.payload.token);
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.loginError = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.isLoggedIn = false;
      state.token = null;
      state.user = {};
    },
  },
});

export default authSliceLogin.reducer;
