import { useState } from "react"
import { useLazyCurrentUserQuery, useUpdateUserMutation } from "../app/services/userApi"
import { TDataUpdateUser } from "../app/types"
import { hasErrorField } from "../utils/hasErrorField"


type FullUpdateUserData = TDataUpdateUser & {
  avatar: File | null;
};

const useUpdateUser = () => {
  const [error, setError] = useState<string>('')
  const [update, { isLoading }] = useUpdateUserMutation()
  const [triggerCurrentUser] = useLazyCurrentUserQuery()


  const fetchUpdateUser = async (data: FullUpdateUserData, id: string, onClose: () => void) => {
    try {
      console.log(id)
      const formData = new FormData()
      data.bio && formData.append('bio', data.bio)
      data.dateOfBirth && formData.append('dateOfBirth', new Date(data.dateOfBirth).toISOString())
      data.location && formData.append('location', data.location)
      data.name && formData.append('name', data.name)
      data.avatar && formData.append('avatar', data.avatar)
      await update({ userData: formData, id }).unwrap()
      await triggerCurrentUser().unwrap()
      onClose()
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.message)
      }
    }
  }

  return {
    fetchUpdateUser,
    error,
    isLoading
  }
}

export default useUpdateUser