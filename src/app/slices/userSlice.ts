import { createSlice } from "@reduxjs/toolkit";
import { TConversation, User } from "../types";
import { userApi } from "../services/userApi";
import { messagesApi } from "../services/messagesApi";

export interface IInitialState {
  user: User | null,
  isAuthenticated: boolean,
  current: User | null,
  currentConversation: TConversation | null
}

const initialState: IInitialState = {
  user: null,
  isAuthenticated: false,
  current: null,
  currentConversation: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.current = null;
      state.currentConversation = null
    },
    resetUser: (state) => {
      state.user = null
    },
    setCurrentConversation: (state, {payload}: {payload: TConversation | null}) => {
      state.currentConversation = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.current = action.payload
        state.isAuthenticated = true
      })
      .addMatcher(userApi.endpoints.register.matchFulfilled, (state, action) => {
        state.current = action.payload
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

export const {logout, resetUser, setCurrentConversation} = userSlice.actions
export default userSlice.reducer

