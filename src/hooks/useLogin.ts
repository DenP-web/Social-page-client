import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLoginMutation } from "../app/services/userApi"
import { hasErrorField } from "../utils/hasErrorField"
import { ROUTES } from "../constants"

interface LoginData {
  email: string
  password: string
}

const useLogin = () => {
  const [error, setError] = useState<string>("")
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()

  async function fetchLogin(data: LoginData) {
    try {
      await login(data).unwrap()
      navigate(ROUTES.HOME_URL)
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.message)
      }
    }
  }

  return {
    fetchLogin,
    error,
    isLoading,
  }
}

export default useLogin
