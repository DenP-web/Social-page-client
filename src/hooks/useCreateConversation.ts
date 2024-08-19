import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { useCreateConversationMutation, useLazyGetAllConversationsQuery } from "../app/services/messagesApi"
import { setCurrentConversation } from "../app/slices/userSlice"
import { hasErrorField } from "../utils/hasErrorField"
import { TConversation } from "../app/types"
import { selectCurrent } from "../app/selects/userSelects"




const useCreateConversation = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrent)
  const [create] = useCreateConversationMutation()
  const [triggerGetAllConversation] = useLazyGetAllConversationsQuery()

  const createConversation = async (userId: string) => {
    try {
      const conversation: TConversation = await create({ id: userId }).unwrap();
      const participants = conversation.participants.filter(item => item.id !== currentUser?.id)
      await triggerGetAllConversation().unwrap()
      dispatch(setCurrentConversation({ ...conversation, participants }))
    } catch (error) {
      if (hasErrorField(error)) {
        toast.error(error.data.message)
      }
    }
  }

  return { createConversation }
}

export default useCreateConversation