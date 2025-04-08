import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import clubReducer from './features/clubSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    club: clubReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
