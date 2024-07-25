import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slices/userSlice"
import { api } from "./services/api"
import { listenerMiddleware } from "./middleware/auth"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware).prepend(listenerMiddleware.middleware)
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
