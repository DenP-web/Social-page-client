import { useState } from "react"
import { useLikeMutation } from "../app/services/likesApi"
import { useLazyGetAllPostsQuery, useLazyGetPostByIdQuery } from "../app/services/postsApi"
import { hasErrorField } from "../utils/hasErrorField"

type nameOfTriggerFnType = 'getPostById' | 'getAllPost'

const useLikePost = () => {
  const [error, setError] = useState<string>('')
  const [triggerAllPosts] = useLazyGetAllPostsQuery()
  const [triggerGetPostById] = useLazyGetPostByIdQuery()
  const [like] = useLikeMutation()

  const fetchLikePost = async (postId: string, nameOfTriggerFn: nameOfTriggerFnType) => {
    try {
      await like({ postId }).unwrap()
      await (nameOfTriggerFn === 'getPostById' ? triggerGetPostById({ id: postId }) : triggerAllPosts()).unwrap()
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