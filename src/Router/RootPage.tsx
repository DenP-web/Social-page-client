import { Outlet } from "react-router-dom"
import { useCurrentUserQuery } from "../app/services/userApi"
import Header from "../components/Header"
import Loader from "../components/ui/Loader"
import { useSocket } from "../hooks"
import useListenMessages from "../hooks/useListenMessages"
import Notification from "../components/Notification"
import useListenFollows from "../hooks/useListenFollows"

const RootPage = () => {
  const { isLoading } = useCurrentUserQuery()
  
  useSocket()
  useListenMessages()
  useListenFollows()

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="relative">
      <Header />
      <Outlet />
      <Notification />
    </div>
  )
}

export default RootPage
