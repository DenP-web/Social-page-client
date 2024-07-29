import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types";
import { userApi } from "../services/userApi";

interface IInitialState {
  user: User | null,
  isAuthenticated: boolean,
  current: User | null,
  token: string | null
}

const initialState: IInitialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  current: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.current = null;
    },
    resetUser: (state) => {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addMatcher(userApi.endpoints.currentUser.matchFulfilled, (state, action) => {
        state.current = action.payload
        state.isAuthenticated = true
      })
      .addMatcher(userApi.endpoints.getUserById.matchFulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
      })
  },
})

export const {logout, resetUser} = userSlice.actions
export default userSlice.reducer

