import { useState } from "react"
import { useLikeMutation } from "../app/services/likesApi"
import { useLazyGetAllPostsQuery } from "../app/services/postsApi"
import { hasErrorField } from "../utils/hasErrorField"


const useLikePost = () => {
  const [error, setError] = useState<string>('')
  const [triggerAllPosts] = useLazyGetAllPostsQuery()
  const [like] = useLikeMutation()

  const fetchLikePost = async (postId: string) => {
    try {
      await like({postId}).unwrap()
      await triggerAllPosts().unwrap()
    } catch (error) {
      if(hasErrorField(error)) {
        setError(error.data.message)
      }
    }
  }

  return {
    fetchLikePost,
    error
  }
}

export default useLikePost