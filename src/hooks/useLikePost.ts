import { useState } from "react"
import { useLikeMutation } from "../app/services/likesApi"
import { useLazyGetAllPostsQuery, useLazyGetPostByIdQuery } from "../app/services/postsApi"
import { hasErrorField } from "../utils/hasErrorField"


const useLikePost = () => {
  const [error, setError] = useState<string>('')
  const [triggerAllPosts] = useLazyGetAllPostsQuery()
  const [triggerGetPostById] = useLazyGetPostByIdQuery()
  const [like] = useLikeMutation()

  const fetchLikePost = async (postId: string, nameOfTriggerFn: string) => {
    try {
      await like({ postId }).unwrap()
      await (nameOfTriggerFn === 'getById' ? triggerGetPostById({ id: postId }) : triggerAllPosts()).unwrap()
    } catch (error) {
      if (hasErrorField(error)) {
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