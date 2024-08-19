import { useState } from "react"
import { useRegisterMutation } from "../app/services/userApi"
import { hasErrorField } from "../utils/hasErrorField"
import { UseFormReset } from "react-hook-form"
import { useNavigate } from "react-router-dom"


type RegisterData = {
  name: string,
  email: string
  password: string
}

type fetchRegisterArg ={
  data: RegisterData,
}


const useRegister = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string>('')
  const [register, { isLoading, isSuccess }] = useRegisterMutation()

  const fetchRegister = async ({data}: fetchRegisterArg) => {
    try {
      await register(data).unwrap()
      navigate('/')
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.message)
      }
    }
  }

  return {
    fetchRegister,
    isLoading,
    error,
    isSuccess
  }
}

export default useRegister