import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import clubReducer from './features/clubSlice';
import eventsReducer from './features/eventSlice';
import promotionsReducer from './features/promotionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    club: clubReducer,
    events: eventsReducer,
    promotions: promotionsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
