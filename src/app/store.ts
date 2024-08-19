import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slices/userSlice"
import { api } from "./services/api"
import socketReducer from './slices/socketSlice';
import notificationSlice from "./slices/notificationSlice"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    socket: socketReducer,
    user: userSlice,
    notification: notificationSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // Ignore actions related to the socket connection
      ignoredActions: ['socket/setSocket'],
      // Optionally ignore paths within stateF
      ignoredPaths: ['socket.socket'],
    },
  }).concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
