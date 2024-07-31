import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react"
import { ROUTES } from "../../constants"

import {
  selectAuthenticated,
  selectCurrent,
} from "../../app/selects/userSelects"
import { logout } from "../../app/slices/userSlice"
import TypeLogBtn from "../TypeLogBtn"
import { useLazyGetAllPostsQuery } from "../../app/services/postsApi"

const Header: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()
  const isAuth = useSelector(selectAuthenticated)
  const currentUserId = (useSelector(selectCurrent))?.id || ''
  const menuItems = [
    { text: "Home", to: ROUTES.HOME_URL },
    { text: "Profile", to: ROUTES.PROFILE_URL },
    { text: "Following", to: ROUTES.FOLLOWING_URL(currentUserId) },
    { text: "Follower", to: ROUTES.FOLLOWER_URL(currentUserId) },
  ]

  const handleLogOut = async () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate(ROUTES.HOME_URL)
    triggerGetAllPosts()
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <Link to={ROUTES.HOME_URL}>
          <NavbarBrand>
            <p className="font-bold text-inherit">DeDigger</p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
        key={"hello"}
      >
        {menuItems.map(item => (
          <NavbarItem key={item.to}>
            <Link to={item.to}>{item.text}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <TypeLogBtn isAuth={isAuth} handleLogOut={handleLogOut} />
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" to={item.to}>
              {item.text}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default Header
