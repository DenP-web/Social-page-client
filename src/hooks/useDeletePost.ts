import { useState } from "react"
import { useDeletePostMutation, useLazyGetAllPostsQuery } from "../app/services/postsApi"
import { hasErrorField } from "../utils/hasErrorField"


const useDeletePost = () => {
  const [error, setError] = useState<string>('')
  const [deletePost, {isLoading}] = useDeletePostMutation()
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()

  const fetchDeletePost = async (postId: string) => {
    try {
      await deletePost({ id: postId }).unwrap()
      await triggerGetAllPosts().unwrap()
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.message)
      }
    }
  }

  return {
    fetchDeletePost,
    error
  }
}


export default useDeletePost