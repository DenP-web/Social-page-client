import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Avatar,
} from "@nextui-org/react"
import { BASE_URL, ROUTES } from "../../constants"

import { selectCurrent } from "../../app/selects/userSelects"
import LogBtn from "../LogBtn"

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const currentUser = useSelector(selectCurrent)
  const currentUserId = currentUser?.id || "1"

  const menuItems = [
    { text: "Home", to: ROUTES.HOME_URL },
    { text: "Messages", to: ROUTES.CONVERSATIONS_URL },
    { text: "Following", to: ROUTES.FOLLOWING_URL(currentUserId) },
    { text: "Follower", to: ROUTES.FOLLOWER_URL(currentUserId) },
  ]
  

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

      <NavbarContent justify="end" className="flex gap-4 items-center">
        <Link to={ROUTES.PROFILE_URL} className="flex gap-4 items-center">
          <Avatar isBordered src={BASE_URL + currentUser?.avatarUrl} />
          <p className="text-black-500" data-testid='username'>{currentUser?.name }</p>
        </Link>
        <LogBtn />
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
