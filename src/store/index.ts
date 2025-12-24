import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import counterReducer from './slices/counterSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
