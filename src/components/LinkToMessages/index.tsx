import { useDispatch, useSelector } from "react-redux"
import { selectCurrent, selectUser } from "../../app/selects/userSelects"
import { useGetAllConversationsQuery } from "../../app/services/messagesApi"
import { setCurrentConversation } from "../../app/slices/userSlice"
import { ROUTES } from "../../constants"
import { useNavigate } from "react-router-dom"
import { TConversation } from "../../app/types"
import useCreateConversation from "../../hooks/useCreateConversation"

const LinkToMessages = () => {
  const { createConversation } = useCreateConversation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data } = useGetAllConversationsQuery()
  const currentUser = useSelector(selectCurrent)
  const user = useSelector(selectUser)

  const conversationId = currentUser?.conversationIDs?.find(id =>
    user?.conversationIDs?.includes(id),
  )
  if (!conversationId && !data) return null

  const currentConversation: TConversation | null =
    data?.find(item => item.id === conversationId) || null
  const participants =
    currentConversation?.participants.filter(
      item => item.id !== currentUser?.id,
    ) || []

  const navigateToMessages = () => {
    if (currentConversation) {
      navigate(ROUTES.CONVERSATIONS_URL)
      dispatch(
        setCurrentConversation({
          ...currentConversation,
          participants: participants,
        }),
      )
    } else {
      navigate(ROUTES.CONVERSATIONS_URL)
      createConversation(user?.id || "")
    }
  }

  return (
    <button
      onClick={navigateToMessages}
      className="text-sm px-5 text-white-500 py-2.5 bg-default-500 rounded-lg text-white"
    >
      Messages
    </button>
  )
}

export default LinkToMessages
