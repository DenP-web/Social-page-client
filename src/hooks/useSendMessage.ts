import { useSelector } from "react-redux"
import { selectCurrent, selectUser } from "../app/selects/userSelects"
import { useGetAllConversationsQuery, useLazyGetAllMessagesQuery, useSendMessageMutation } from "../app/services/messagesApi"
import { hasErrorField } from "../utils/hasErrorField"
import toast from "react-hot-toast"


const useSendMessage = () => {
  const [send, { isLoading, data }] = useSendMessageMutation()
  const [triggerGetAllMessage] = useLazyGetAllMessagesQuery()




  const sendMessage = async (sendData: { message: string, receiverId: string }, conversationId: { conversationId: string }) => {
    try {
      await send(sendData).unwrap()
      await triggerGetAllMessage(conversationId).unwrap()
    } catch (error) {
      if (hasErrorField(error)) {
        toast.error(error.data.message)
      }
    }
  }

  return {
    sendMessage, isLoading
  }

}

export default useSendMessage