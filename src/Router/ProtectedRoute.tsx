import React, { ReactElement } from "react"
import { Navigate } from "react-router-dom"
import { ROUTES } from "../constants"

type ProtectedRouteProps = {
  children: ReactElement
  allowedRoles: string[]
  navigateTo?: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  navigateTo = '/'
}) => {
  const { role } = { role: "GUEST" }
  if (!allowedRoles.includes(role)) return <Navigate to={navigateTo} replace />
  return children
}

export default ProtectedRoute
