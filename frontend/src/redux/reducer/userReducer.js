import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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

export const { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } =
  userSlice.actions;

export default userSlice.reducer;
