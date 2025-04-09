import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import clubReducer from './features/clubSlice';
import eventsReducer from './features/eventSlice';
import userReducer from './features/userSlice';
import promotionsReducer from './features/promotionSlice';
import ticketReducer from './features/ticketSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    club: clubReducer,
    events: eventsReducer,
    user: userReducer,
    promotions: promotionsReducer,
    ticket: ticketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
