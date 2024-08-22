import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userSlice from '../app/slices/userSlice';
import socketSlice from '../app/slices/socketSlice';
import notificationSlice from '../app/slices/notificationSlice';
import { api } from '../app/services/api';

const mockStore = (initialState: unknown) => {
  return configureStore({
    reducer: (state = initialState, action) => state,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
  })
};

export { mockStore, Provider };
