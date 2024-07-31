import { useParams } from "react-router-dom"
import FollowList from "../../components/FollowList"
import { useGetUserByIdQuery } from "../../app/services/userApi"

const FollowerPage = () => {
  const { id } = useParams()
  const { data } = useGetUserByIdQuery({ id: id ? id : "" })

  if (!data) {
    return null
  }

  return (
    <FollowList data={data.followers} type="follower" username={data.name!} />
  )
}

export default FollowerPage
