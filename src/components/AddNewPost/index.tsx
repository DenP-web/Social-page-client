import React from "react"
import { Button } from "@nextui-org/react"
import { useForm } from "react-hook-form"
import useCreatePost from "../../hooks/useCreataPost"
import ErrorMessage from "../ui/ErrorMessage"
import Textarea from "../ui/TextArea"

const AddNewPost = () => {
  const { createPost, error, isLoading } = useCreatePost()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      content: "",
    },
  })

  const onSubmit = (data: { content: string }) => {
    createPost(data, reset)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center gap-4 items-end w-full"
    >
      <Textarea
        name="content"
        control={control}
        label="Add new post"
        placeholder="Enter your description"
        classNames="max-w-xs"
        requiredMessage="Required field"
      />

      <ErrorMessage error={error} />

      <Button color="success" type="submit" isLoading={isLoading}>
        Add
      </Button>
    </form>
  )
}

export default AddNewPost
