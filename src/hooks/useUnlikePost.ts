import { useState } from "react"
import { useLazyGetAllPostsQuery, useLazyGetPostByIdQuery } from "../app/services/postsApi"
import { useUnlikeMutation } from "../app/services/likesApi"
import { hasErrorField } from "../utils/hasErrorField"



const useUnlikePost = () => {
  const [error, setError] = useState('')
  const [triggerAllPosts] = useLazyGetAllPostsQuery()
  const [triggerGetPostById] = useLazyGetPostByIdQuery()
  const [unlike, status] = useUnlikeMutation()

  const fetchUnlikePost = async (postId: string, nameOfTriggerFn: string) => {
    try {
      await unlike({ postId }).unwrap()
      await (nameOfTriggerFn === 'getById' ? triggerGetPostById({ id: postId }) : triggerAllPosts()).unwrap()
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