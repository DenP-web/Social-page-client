import { Button } from "@nextui-org/react"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import Textarea from "../ui/TextArea"
import useCreateComment from "../../hooks/useCreateComment"
import ErrorMessage from "../ui/ErrorMessage"

type AddNewCommentProps = {
  postId: string
}

const AddNewComment: React.FC<AddNewCommentProps> = ({ postId }) => {
  const { fetchCreateComment, error, isLoading } = useCreateComment()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      content: "",
    },
  })

  const onSubmit = (data: { content: string }) => {
    fetchCreateComment({ content: data.content, postId })
  }

  useEffect(() => {
    if (error) return
    reset()
  }, [error, reset, isLoading])

  return (
    <form className="w-full max-w-[600px]" onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        control={control}
        name="content"
        requiredMessage="Required field"
        placeholder="Write your comment"
        classNames="mb-2"
      />

      <ErrorMessage error={error} />

      <Button color="primary" type="submit" isLoading={isLoading}>
        Add comment
      </Button>
    </form>
  )
}

export default AddNewComment
