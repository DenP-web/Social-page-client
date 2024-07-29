import { useState } from "react"
import { useRegisterMutation } from "../app/services/userApi"
import { hasErrorField } from "../utils/hasErrorField"


type RegisterData = {
  name: string,
  email: string
  password: string
}


const useRegister = () => {
  const [error, setError] = useState<string>('')
  const [register, { isLoading }] = useRegisterMutation()
  const fetchRegister = async (data: RegisterData) => {
    try {
      await register(data).unwrap()
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.message)
      }
    }
  }

  return {
    fetchRegister,
    isLoading,
    error
  }
}

export default useRegister