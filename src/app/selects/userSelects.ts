import { RootState } from "../store";

export const selectAuthenticated = (state: RootState) => state.user.isAuthenticated
export const selectCurrent = (state: RootState) => state.user.current
export const selectUser = (state: RootState) => state.user.user
export const selectCurrentConversation = (state: RootState) => state.user.currentConversation
