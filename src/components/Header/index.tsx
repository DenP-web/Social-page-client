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

import { selectAuthenticated } from "../../app/selects/userSelects"
import { logout } from "../../app/slices/userSlice"

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const isAuth = useSelector(selectAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const menuItems = [
    { text: "Home", to: ROUTES.HOME_URL },
    { text: "Profile", to: ROUTES.USER_URL("1") },
    { text: "Following", to: ROUTES.FOLLOWING_URL },
    { text: "Follower", to: ROUTES.FOLLOWER_URL },
  ]

  const handleLogOut = async () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate(ROUTES.HOME_URL)
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">DeDigger</p>
        </NavbarBrand>
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
        {isAuth ? (
          <Button onClick={handleLogOut} variant="bordered" color="danger">
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
        )}
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
