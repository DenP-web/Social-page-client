import { useSelector } from "react-redux"
import { selectCurrent } from "../../app/selects/userSelects"
import UserInfo from "../../components/UserInfo"

const ProfilePage = () => {
  const currentUser = useSelector(selectCurrent)

  if (!currentUser) {
    return null
  }

  return <UserInfo data={currentUser} updateBtn={true} />
}

export default ProfilePage
