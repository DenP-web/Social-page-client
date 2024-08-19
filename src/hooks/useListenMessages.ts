import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectCurrentConversation } from "../app/selects/userSelects"
import { useLazyGetAllConversationsQuery, useLazyGetAllMessagesQuery } from "../app/services/messagesApi"
import { TMessage } from "../app/types"
import notificationSounds from '../assets/sounds/notification.mp3'
import { selectSocket } from "../app/selects/socketSelects"
import { openNotification } from "../app/slices/notificationSlice"


const useListenMessages = () => {
  const socket = useSelector(selectSocket)
  const dispatch = useDispatch()
  const currentConversation = useSelector(selectCurrentConversation)
  const [triggerGetAllMessages] = useLazyGetAllMessagesQuery()
  const [triggerGetAllConversation] = useLazyGetAllConversationsQuery()

  useEffect(() => {
    if (!socket) return

    socket.on('newMessage', (newMessage: TMessage) => {
      triggerGetAllMessages({ conversationId: currentConversation?.id || '' })
      triggerGetAllConversation()
      const sound = new Audio(notificationSounds)
      sound.play()
      dispatch(openNotification({ text: `You have new message from ${newMessage.sender.name}`, senderId: newMessage.senderId, type: "message" }))
    })

    return () => {
      socket.off('newMessage')
    }
  }, [socket, triggerGetAllMessages, currentConversation])
}

export default useListenMessages