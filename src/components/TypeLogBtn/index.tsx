import React from 'react'
import { ROUTES } from '../../constants'
import { Button, NavbarItem } from '@nextui-org/react'
import { Link } from 'react-router-dom'

type TypeLogBtn = {
  isAuth: boolean,
  handleLogOut: () => void
}

const TypeLogBtn: React.FC<TypeLogBtn> = ({isAuth, handleLogOut}) => {
  return (
    isAuth ? (
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
    )
  )
}

export default TypeLogBtn
