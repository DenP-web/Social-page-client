import { useState } from "react"
import { useFollowMutation, useUnfollowMutation } from "../app/services/followApi"
import { useLazyCurrentUserQuery, useLazyGetUserByIdQuery } from "../app/services/userApi"
import { hasErrorField } from "../utils/hasErrorField"



const useFollowFeatures = () => {
  const [error, setError] = useState<string>('')
  const [createFollow, { isLoading: followLoading }] = useFollowMutation()
  const [deleteFollow, { isLoading: unfollowLoading }] = useUnfollowMutation()
  const [triggerUserById] = useLazyGetUserByIdQuery()
  const [triggerCurrentUser] = useLazyCurrentUserQuery()
  const isLoading = followLoading || unfollowLoading ? true : false

  const follow = async (followingId: string) => {
    try {
      await createFollow({ followingId }).unwrap()
      await triggerUserById({ id: followingId }).unwrap()
      await triggerCurrentUser().unwrap()
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.message)
      }
    }
  }

  const unfollow = async (followingId: string) => {
    try {
      await deleteFollow({ followingId }).unwrap()
      await triggerUserById({ id: followingId })
      await triggerCurrentUser().unwrap()
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.message)
      }
    }
  }

  return {
    follow, unfollow, isLoading, error
  }

}

export default useFollowFeatures