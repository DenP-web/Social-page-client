import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { RootState } from '../app/store';
import { setOnlineUsers, setSocket } from '../app/slices/socketSlice';
import { selectCurrent } from '../app/selects/userSelects';
import { BASE_URL } from '../constants';



type OnlineUsers = string[];

export const useSocket = () => {
  const dispatch = useDispatch();
  const { socket } = useSelector((state: RootState) => state.socket);
  const userData = useSelector(selectCurrent);

  useEffect(() => {
    if (userData) {
      const newSocket: Socket = io(BASE_URL, {
        query: { userId: userData.id },
      });

      dispatch(setSocket(newSocket));

      newSocket.on('getOnlineUsers', (users: OnlineUsers) => {
        dispatch(setOnlineUsers(users));
      });

      newSocket.on('disconnect', () => {
        dispatch(setSocket(null));
      });

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [userData]);
};

export default useSocket