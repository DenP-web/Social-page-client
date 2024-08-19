import { useSelector } from "react-redux"
import { useDisclosure } from "@nextui-org/react"
import { selectCurrent } from "../../app/selects/userSelects"
import UserInfo from "../../components/UserInfo"
import EditProfile from "../../components/EditProfile"

const ProfilePage = () => {
  const currentUser = useSelector(selectCurrent)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  if (!currentUser) {
    return null
  }

  return (
    <>
      <EditProfile
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        userId={currentUser.id}
        onClose={onClose}
      />
      <UserInfo data={currentUser} updateBtn={true} onOpen={onOpen} />
    </>
  )
}

export default ProfilePage
