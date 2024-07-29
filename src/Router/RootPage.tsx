import { Outlet } from "react-router-dom"
import { useCurrentUserQuery } from "../app/services/userApi"
import Header from "../components/Header"
import Loader from "../components/ui/Loader"

const RootPage = () => {
  const { isLoading } = useCurrentUserQuery()

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default RootPage
