import { MouseEvent, RefObject, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  selectNotificationIsOpen,
  selectNotificationMessage,
  selectNotificationType,
} from "../../app/selects/notificationSelects"
import { closeNotification } from "../../app/slices/notificationSlice"
import useCreateConversation from "../../hooks/useCreateConversation"
import { ROUTES } from "../../constants"
import { selectCurrent } from "../../app/selects/userSelects"

const Notification = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const message = useSelector(selectNotificationMessage)
  const isOpen = useSelector(selectNotificationIsOpen)
  const currentUser = useSelector(selectCurrent)
  const notificationType = useSelector(selectNotificationType)
  const closeBtnRef: RefObject<HTMLButtonElement> = useRef(null)
  const { createConversation } = useCreateConversation()

  const handleClose = () => {
    dispatch(closeNotification())
  }

  useEffect(() => {
    if (!isOpen) return
    const delay = 2000

    const timer = setTimeout(() => {
      dispatch(closeNotification())
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen) return null

  const navigateTo = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === closeBtnRef.current) return null
    if (notificationType === "message") {
      createConversation(message.senderId)
      navigate(ROUTES.CONVERSATIONS_URL)
    }
    if (notificationType === "follow") {
      if (currentUser && "id" in currentUser) {
        navigate(ROUTES.FOLLOWER_URL(currentUser.id))
      }
    }
  }

  return (
    <div
      className="fixed w-[200px] border-2 right-4 bottom-4 cursor-pointer"
      onClick={navigateTo}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-sm w-full">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
          onClick={handleClose}
          ref={closeBtnRef}
        >
          &times;
        </button>
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  )
}

export default Notification
