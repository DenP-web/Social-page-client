import React, { useEffect, useState } from "react"
import { useLoginMutation } from "../app/services/userApi"
import { hasErrorField } from "../utils/hasErrorField"

type LoginData = {
  email: string
  password: string
}

const useLogin = () => {
  const [error, setError] = useState<string>("")
  const [login, { isError, isLoading }] = useLoginMutation()

  async function fetchData(data: LoginData) {
    try {
      await login(data).unwrap()
      
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.message)
      }
    }
  }

  return {
    fetchData,
    error,
    isLoading,
  }
}

export default useLogin
