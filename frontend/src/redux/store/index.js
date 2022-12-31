import { configureStore } from '@reduxjs/toolkit';
import authSliceLogin from '../reducer/loginReducer';

const store = configureStore({
  reducer: {
    auth: authSliceLogin,
  },
});

export default store;
