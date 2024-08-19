import toast from "react-hot-toast"
import { useLazyGetAllConversationsQuery, useLeaveConversationMutation } from "../app/services/messagesApi"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentConversation } from "../app/selects/userSelects"
import { setCurrentConversation } from "../app/slices/userSlice"
import { hasErrorField } from "../utils/hasErrorField"



const useLeaveConversation = () => {
  const currentConversation = useSelector(selectCurrentConversation)
  const dispatch = useDispatch()
  const [leave, { isLoading }] = useLeaveConversationMutation()
  const [triggerGetAllConversation] = useLazyGetAllConversationsQuery()

  const leaveConversation = async (id: string) => {
    try {
      await leave({ id }).unwrap()
      await triggerGetAllConversation().unwrap()
      if (currentConversation?.id === id) {
        dispatch(setCurrentConversation(null))
      }
      toast.success('You successfully leave the conversation')
    } catch (error) {
      if (hasErrorField(error)) {
        toast.error(error.data.message)
      }

    }
  }
  return { leaveConversation, isLoading }
}

export default useLeaveConversation

