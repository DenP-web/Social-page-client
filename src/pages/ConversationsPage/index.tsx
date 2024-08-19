import { useEffect, useState } from "react"
import ConversationsList from "../../components/ConversationsList"
import ChatList from "../../components/ChatList"
import ChatNotSelected from "../../components/ChatNotSelected"
import { TConversation } from "../../app/types"
import { Spinner } from "@nextui-org/react"
import { Navigate } from "react-router-dom"
import { ROUTES } from "../../constants"
import { useGetAllConversationsQuery } from "../../app/services/messagesApi"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentConversation } from "../../app/selects/userSelects"
import { setCurrentConversation } from "../../app/slices/userSlice"

const ConversationsPage = () => {
  const dispatch = useDispatch()
  const { data, isLoading } = useGetAllConversationsQuery()
  const selectedConversation = useSelector(selectCurrentConversation)

  useEffect(() => {
    return () => {
      dispatch(setCurrentConversation(null))
    }
  }, [])

  if (isLoading) {
    return <Spinner size="lg" />
  }

  if (!data) {
    return <Navigate to={ROUTES.HOME_URL} />
  }

  

  return (
    <div className="flex justify-center space-x-4">
      {!data.length ? (
        <p>No chats yet</p>
      ) : (
        <>
          <ConversationsList
            conversations={data}
          />
          <div className="max-w-[600px] w-full bg-gray-300 rounded-md">
            {selectedConversation !== null ? (
              <ChatList />
            ) : (
              <ChatNotSelected />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default ConversationsPage
