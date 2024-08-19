
import UserInfo from "../../components/UserInfo"
import { useGetUserByIdQuery } from "../../app/services/userApi"
import { useParams } from "react-router-dom"

const UserPage = () => {
  const { id } = useParams()
  const { data } = useGetUserByIdQuery({ id: id ? id : "" })

  
  
  return <UserInfo data={data} updateBtn={false} />
}

export default UserPage
