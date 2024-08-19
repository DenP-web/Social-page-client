import { Navigate } from "react-router-dom"
import { Spinner } from "@nextui-org/react"
import { useGetAllConversationsQuery } from "../../app/services/messagesApi"
import { ROUTES } from "../../constants"
import ConversationCard from "../ConversationCard"
import { TConversation } from "../../app/types"

type ConversationListProps = {
  conversations: TConversation[]
  selectedChatId?: string
}

const ConversationsList: React.FC<ConversationListProps> = ({
  conversations,
}) => {

  return (
    <ul className="flex flex-col max-w-[500px] pr-2 border-r-2">
      {conversations.map(conversation => (
        <ConversationCard
          key={conversation.id}
          conversation={conversation}
        />
      ))}
    </ul>
  )
}

export default ConversationsList
