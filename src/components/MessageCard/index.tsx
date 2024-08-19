import React from "react"
import { TMessage } from "../../app/types"
import { useSelector } from "react-redux"
import { selectCurrent } from "../../app/selects/userSelects"
import { Avatar } from "@nextui-org/react"
import { BASE_URL, ROUTES } from "../../constants"
import { Link } from "react-router-dom"
import { convertISOToTime } from "../../utils/convertISOToTime"

type MessageCardProps = {
  message: TMessage
}

const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  

  return (
    <>
      <Link to={ROUTES.USER_URL(message.senderId)}>
        <Avatar
          src={BASE_URL + message.sender.avatarUrl}
          size="sm"
          className="border-2 border-white"
        />
      </Link>
      <p className="p-2 rounded-lg text-white ">{message.message}</p>
      <span className="text-xs">{convertISOToTime(message.createdAt)}</span>
    </>
  )
}

export default MessageCard
