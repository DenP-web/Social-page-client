import { useState } from "react"
import { useDeleteCommentMutation } from "../app/services/commentsApi"
import { hasErrorField } from "../utils/hasErrorField"
import { useLazyGetPostByIdQuery } from "../app/services/postsApi"


const useDeleteComment = () => {
  const [error, setError] = useState<string>('')
  const [deleteComment, { isLoading }] = useDeleteCommentMutation()
  const [triggerGetPostById] = useLazyGetPostByIdQuery()

  const fetchDeleteComment = async (commentId: string, postId: string = '' ) => {
    try {
      await deleteComment({ id: commentId }).unwrap()
      await triggerGetPostById({ id: postId}).unwrap()
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.message)
      }
    }
  }

  return {
    fetchDeleteComment, error, isLoading
  }
}

export default useDeleteComment