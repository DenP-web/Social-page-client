import React from "react"
import { useForm } from "react-hook-form"
import Input from "../ui/Input"
import ErrorMessage from "../ui/ErrorMessage"
import { Button } from "@nextui-org/react"
import useLogin from "../../hooks/useLogin"

type Login = {
  email: string
  password: string
}

type LoginProps = {
  changeTab: () => void
}

const Login: React.FC<LoginProps> = ({ changeTab }) => {
  const { fetchData, isLoading, error } = useLogin()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: Login) => {
    fetchData(data)
  }

  return (
    <form
      className="flex flex-col items-center justify-center p-[10px] h-[100%]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        className="w-[300px]"
        control={control}
        label="Email"
        name="email"
        required="Required field"
      />

      <Input
        className="w-[300px]"
        control={control}
        label="Password"
        name="password"
        type="password"
        required="Required field"
      />

      <ErrorMessage error={error} />

      <button
        type="button"
        className="text-sm mb-3 underline text-primary"
        onClick={() => changeTab()}
      >
        If you don't have an account, Sign Up now!
      </button>

      <Button color="primary" type="submit" isLoading={isLoading}>
        Sign Up
      </Button>
    </form>
  )
}

export default Login
