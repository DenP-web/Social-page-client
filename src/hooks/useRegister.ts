import { useState } from "react"
import { useRegisterMutation } from "../app/services/userApi"
import { hasErrorField } from "../utils/hasErrorField"
import { UseFormReset } from "react-hook-form"


type RegisterData = {
  name: string,
  email: string
  password: string
}

type fetchRegisterArg ={
  data: RegisterData,
  changeTab: () => void,
  reset: UseFormReset<RegisterData>
}


const useRegister = () => {
  const [error, setError] = useState<string>('')
  const [register, { isLoading, isSuccess }] = useRegisterMutation()

  const fetchRegister = async ({data, changeTab, reset}: fetchRegisterArg) => {
    try {
      await register(data).unwrap()
      changeTab()
      reset()
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