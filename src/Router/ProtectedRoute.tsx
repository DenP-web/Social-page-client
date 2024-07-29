import React, { ReactElement } from "react"
import { Navigate } from "react-router-dom"
import { ROUTES } from "../constants"
import {
  useCurrentUserQuery,
  useLazyCurrentUserQuery,
} from "../app/services/userApi"
import Loader from "../components/ui/Loader"
import { useSelector } from "react-redux"
import { selectAuthenticated, selectCurrent } from "../app/selects/userSelects"

type ProtectedRouteProps = {
  children: ReactElement
  allowedRoles: string[]
  navigateTo?: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  navigateTo = "/",
}) => {
  const currentUser = useSelector(selectCurrent)
  const role: string =
    currentUser && "role" in currentUser
      ? (currentUser.role as string)
      : "GUEST"

  if (!allowedRoles.includes(role)) return <Navigate to={navigateTo} replace />
  return children
}

export default ProtectedRoute
