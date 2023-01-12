import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//create async thunk
export const register = createAsyncThunk(
  'register/register',
  async (payload, thunkAPI) => {
    try {
      // set header to specify that the data being sent is in json format
      const config = { headers: { 'Content-Type': 'application/json' } };
      const response = await axios.post(
        'http://localhost:8080/register',
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

const authSliceRegister = createSlice({
  name: 'register',
  initialState: {
    isLoading: false,
    token: null,
    user: {},
    registerSuccess: false,
    registerError: null,
  },
  reducers: {
    //handling async actions
    [register.pending]: (state) => {
      state.isLoading = true;
      state.registerSuccess = false;
      state.registerError = null;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.registerSuccess = true;
    },
    [register.rejected]: (state, action) => {
      state.isLoading = false;
      state.registerError = action.payload;
    },
  },
});

export default authSliceRegister.reducer;
