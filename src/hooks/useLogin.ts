import React, { useEffect, useState } from "react"
import { useLazyCurrentUserQuery, useLoginMutation } from "../app/services/userApi"
import { hasErrorField } from "../utils/hasErrorField"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../constants"

type LoginData = {
  email: string
  password: string
}

const useLogin = () => {
  const [error, setError] = useState<string>("")
  const [login, { isError, isLoading }] = useLoginMutation()
  const [triggerCurrentUser] = useLazyCurrentUserQuery()
  const navigate = useNavigate()

  async function fetchLogin(data: LoginData) {
    try {
      await login(data).unwrap()
      await triggerCurrentUser().unwrap()
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
