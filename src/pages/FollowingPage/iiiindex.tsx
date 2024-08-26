import React from "react"

import { useParams } from "react-router-dom"
import { useGetUserByIdQuery } from "../../app/services/userApi"
import FollowList from "../../components/FollowList"

const FollowingPage = () => {
  const { id } = useParams()
  const { data } = useGetUserByIdQuery({ id: id ? id : "" })

  if (!data) {
    return null
  }

  return (
    <FollowList data={data.following} type="following" username={data.name!} />
  )
}

export default FollowingPage
