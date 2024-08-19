import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"


import { Follow } from "../app/types"
import { selectSocket } from "../app/selects/socketSelects"
import { openNotification } from "../app/slices/notificationSlice"
import { useLazyCurrentUserQuery, useLazyGetUserByIdQuery } from "../app/services/userApi"

const useListenFollows = () => {
  const socket = useSelector(selectSocket)
  const dispatch = useDispatch()
  const [triggerGetUserById] = useLazyGetUserByIdQuery()
  const [triggerCurrentUser] = useLazyCurrentUserQuery()
  const { id } = useParams()

  useEffect(() => {
    if (!socket) return

    socket.on('newFollower', (newFollower: Follow) => {
      if (id) {
        triggerGetUserById({ id })
      }
      triggerCurrentUser()
      dispatch(openNotification({ text: `You have new follower, ${newFollower.follower.name}`, senderId: newFollower.followerId, type: "follow" }))
    })

  }, [socket, dispatch, openNotification,])
}

export default useListenFollows