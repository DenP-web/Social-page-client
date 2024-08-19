import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type NotificationType = 'follow' | 'message' | null

type notificationState = {
  message: { text: string, senderId: string },
  isOpen: boolean
  delay: number,
  type: NotificationType
}

const initialState: notificationState = {
  message: { text: '', senderId: '' },
  isOpen: false,
  delay: 2000,
  type: null
}


const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    openNotification(state, action: PayloadAction<{ text: string, senderId: string, type: NotificationType }>) {
      state.message = { text: action.payload.text, senderId: action.payload.senderId };
      state.isOpen = true;
      state.type = action.payload.type
    },

    closeNotification(state) {
      state.message = { text: '', senderId: '' };
      state.isOpen = false;
      state.type = null
    }
  }
})

export const { openNotification, closeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;