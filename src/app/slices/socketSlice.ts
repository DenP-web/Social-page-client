import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

type OnlineUsers = string[];

interface SocketState {
  socket: Socket | null;
  onlineUsers: OnlineUsers;
}

const initialState: SocketState = {
  socket: null,
  onlineUsers: [],
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket(state, action: PayloadAction<Socket | null>) {
      return {
        ...state,
        socket: action.payload
      }
    },
    setOnlineUsers(state, action: PayloadAction<OnlineUsers>) {
      return {
        ...state,
        onlineUsers: action.payload
      }
    },
  },
});

export const { setSocket, setOnlineUsers } = socketSlice.actions;

export default socketSlice.reducer;