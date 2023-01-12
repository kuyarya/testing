import { configureStore } from '@reduxjs/toolkit';
import authSliceLogin from '../reducer/loginReducer';
import authSliceRegister from '../reducer/registerReducer';
import userSlice from '../reducer/userReducer';

const store = configureStore({
  reducer: {
    login: authSliceLogin,
    register: authSliceRegister,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
