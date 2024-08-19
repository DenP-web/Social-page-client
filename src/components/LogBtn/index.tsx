import React from "react"
import { ROUTES } from "../../constants"
import { Button, NavbarItem } from "@nextui-org/react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useLazyGetAllPostsQuery } from "../../app/services/postsApi"
import { logout } from "../../app/slices/userSlice"
import { selectAuthenticated } from "../../app/selects/userSelects"
import { useLogoutMutation } from "../../app/services/userApi"

const LogBtn: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuth = useSelector(selectAuthenticated)
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()
  const [logOutServer, {isLoading} ] = useLogoutMutation()

  const handleLogOut = async () => {
    dispatch(logout())
    navigate(ROUTES.HOME_URL)
    triggerGetAllPosts()
    logOutServer()
  }

  return isAuth ? (
    <Button onClick={handleLogOut} variant="bordered" color="danger" isLoading={isLoading}>
      Log Out
    </Button>
  ) : (
    <NavbarItem>
      <Link
        className="p-2 bg-green-500 text-white rounded-2xl"
        to={ROUTES.REGISTRATION_URL}
      >
        Log In
      </Link>
    </NavbarItem>
  )
}

export default LogBtn
