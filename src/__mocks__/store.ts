import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userSlice from '../app/slices/userSlice';
import socketSlice from '../app/slices/socketSlice';
import notificationSlice from '../app/slices/notificationSlice';
import { api } from '../app/services/api';

const mockStore = (initialState: unknown) => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      socket: socketSlice,
      user: userSlice,
      notification: notificationSlice,
    },
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['socket/setSocket'],
          ignoredPaths: ['socket.socket'],
        },
      }).concat(api.middleware),
  });
};

export { mockStore, Provider };
