import { useState } from "react"
import { useCreatePostMutation, useLazyGetAllPostsQuery } from "../app/services/postsApi"
import { hasErrorField } from "../utils/hasErrorField"
import { UseFormReset } from "react-hook-form"


const useCreatePost = () => {
  const [error, setError] = useState<string>('')
  const [create, { isError, isLoading }] = useCreatePostMutation()
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()

  const createPost = async (data: { content: string }, reset: UseFormReset<{ content: string }>) => {
    try {
      await create(data).unwrap()
      await triggerGetAllPosts().unwrap()
      reset()
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