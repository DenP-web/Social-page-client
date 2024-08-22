import { useState } from "react"
import { useCreatePostMutation, useLazyGetAllPostsQuery } from "../app/services/postsApi"
import { hasErrorField } from "../utils/hasErrorField"


const useCreatePost = () => {
  const [error, setError] = useState<string>('')
  const [create, { isError, isLoading }] = useCreatePostMutation()
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()

  const createPost = async (data: { content: string }) => {
    try {
      await create(data).unwrap()
      await triggerGetAllPosts().unwrap()
    } catch (error) {
      if (hasErrorField(error) && isError) {
        setError(error.data.message)
      }
    }
  }

  return {
    createPost,
    isLoading,
    error
  }
}

export default useCreatePost