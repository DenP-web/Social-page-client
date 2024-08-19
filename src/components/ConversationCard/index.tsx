import React from "react"
import { TConversation } from "../../app/types"
import { User } from "@nextui-org/react"
import { BASE_URL } from "../../constants"
import { useDispatch, useSelector } from "react-redux"
import {
  selectCurrent,
  selectCurrentConversation,
} from "../../app/selects/userSelects"
import { setCurrentConversation } from "../../app/slices/userSlice"
import DeleteBtn from "../ui/DeleteBtn"
import useLeaveConversation from "../../hooks/useLeaveConversation"

type ConversationCardProps = {
  conversation: TConversation
}

const ConversationCard: React.FC<ConversationCardProps> = ({
  conversation,
}) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrent)
  const currentConversation = useSelector(selectCurrentConversation)
  const isActive = currentConversation?.id === conversation.id
  const { leaveConversation, isLoading } = useLeaveConversation()
  const participants = conversation.participants.filter(
    item => item.id !== currentUser?.id,
  )

  const currentConversationHandler = () => {
    dispatch(setCurrentConversation({...conversation, participants}))
  }

  const leaveConversationHandler = () => {
    leaveConversation(conversation.id)
  }

  return (
    <li
      className={`flex gap-2 rounded-md relative ${isActive ? "bg-primary-100" : ""}`}
    >
      {participants.map(p => (
        <button key={p.id} type="button" onClick={currentConversationHandler}>
          <User
            className="border-1 py-1 pl-1 pr-6"
            name={p.name}
            avatarProps={{
              src: `${BASE_URL}${p.avatarUrl}`,
            }}
          />
        </button>
      ))}
      <DeleteBtn fn={leaveConversationHandler} isLoading={isLoading} />
    </li>
  )
}

export default ConversationCard
