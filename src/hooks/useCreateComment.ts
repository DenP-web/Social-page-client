import { useState } from "react"
import { useLazyGetPostByIdQuery } from "../app/services/postsApi"
import { useCreateCommentMutation } from "../app/services/commentsApi"
import { hasErrorField } from "../utils/hasErrorField"
import { UseFormReset } from "react-hook-form"

const useCreateComment = () => {
  const [error, setError] = useState<string>('')
  const [triggerGetPostById] = useLazyGetPostByIdQuery()
  const [createComment, { isLoading }] = useCreateCommentMutation()

  const fetchCreateComment = async (commentData: { postId: string, content: string }, reset: UseFormReset<{ content: string }>) => {
    try {
      await createComment(commentData).unwrap()
      await triggerGetPostById({ id: commentData.postId })
      reset()
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.message)
      }
    }
  }

  return {
    fetchCreateComment,
    error,
    isLoading
  }
}

export default useCreateComment