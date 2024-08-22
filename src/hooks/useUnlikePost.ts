import { useState } from "react"
import { useLazyGetAllPostsQuery, useLazyGetPostByIdQuery } from "../app/services/postsApi"
import { useUnlikeMutation } from "../app/services/likesApi"
import { hasErrorField } from "../utils/hasErrorField"


type nameOfTriggerFnType = 'getPostById' | 'getAllPost'

const useUnlikePost = () => {
  const [error, setError] = useState('')
  const [triggerAllPosts] = useLazyGetAllPostsQuery()
  const [triggerGetPostById] = useLazyGetPostByIdQuery()
  const [unlike] = useUnlikeMutation()

  const fetchUnlikePost = async (postId: string, nameOfTriggerFn: nameOfTriggerFnType) => {
    try {
      await unlike({ postId }).unwrap()
      await (nameOfTriggerFn === 'getPostById' ? triggerGetPostById({ id: postId }) : triggerAllPosts()).unwrap()
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.message)
      }
    }
  }

  return {
    fetchUnlikePost, error
  }
}

export default useUnlikePost