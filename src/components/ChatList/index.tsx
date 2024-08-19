import React, { useEffect, useRef } from "react"
import { useGetAllMessagesQuery } from "../../app/services/messagesApi"
import { Spinner } from "@nextui-org/react"
import MessageCard from "../MessageCard"
import SendMessage from "../SendMessage"
import { useSelector } from "react-redux"
import {
  selectCurrent,
  selectCurrentConversation,
} from "../../app/selects/userSelects"
import useListenMessages from "../../hooks/useListenMessages"

const ChatList: React.FC = () => {
  const selectedConversation = useSelector(selectCurrentConversation)
  const currentUser = useSelector(selectCurrent)
  const lastMessageRef = useRef<HTMLLIElement | null>(null)

  const { data, isLoading } = useGetAllMessagesQuery({
    conversationId: selectedConversation?.id || "",
  })

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [data, isLoading])

  if (isLoading) {
    return <Spinner />
  }
  if (!data) {
    return null
  }

  return (
    <div className="w-full flex flex-col justify-between ">
      <ul className="w-full p-6 flex flex-col h-[400px]  overflow-auto gap-6">
        {data.map(message => (
          <li
            key={message.id}
            ref={lastMessageRef}
            className={`flex items-center gap-2 ${message.senderId === currentUser?.id ? " [&>p]:bg-primary-500 flex-row-reverse" : " [&>p]:bg-default-500"}`}
          >
            <MessageCard message={message} />
          </li>
        ))}
      </ul>
      <SendMessage />
    </div>
  )
}

export default ChatList
