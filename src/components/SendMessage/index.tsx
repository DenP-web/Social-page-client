import React, { memo } from "react"
import { useForm } from "react-hook-form"
import Input from "../ui/Input"
import { Button } from "@nextui-org/react"
import { useSendMessage } from "../../hooks"
import { selectCurrentConversation } from "../../app/selects/userSelects"
import { useSelector } from "react-redux"

const SendMessage: React.FC = () => {
  const { sendMessage, isLoading } = useSendMessage()
  const selectedConversation = useSelector(selectCurrentConversation)

  const { control, handleSubmit, reset } = useForm<{ message: string }>({
    mode: "onChange",
    defaultValues: { message: "" },
  })

  const onSubmit = (data: { message: string }) => {
    const receiverId: string = selectedConversation?.participants[0].id || ""
    sendMessage(
      { message: data.message, receiverId },
      { conversationId: selectedConversation?.id || "" },
    )
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-4 border-2 border-gray-700 rounded-xl p-4"
    >
      <Input
        control={control}
        placeholder="Write your message"
        name="message"
      />
      <Button color="primary" type="submit" isLoading={isLoading}>
        Send
      </Button>
    </form>
  )
}

export default memo(SendMessage)
