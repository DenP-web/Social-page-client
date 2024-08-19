import React, { useState } from "react"
import { useForm } from "react-hook-form"
import Input from "../ui/Input"
import ErrorMessage from "../ui/ErrorMessage"
import { Button } from "@nextui-org/react"
import useRegister from "../../hooks/useRegister"

type RegisterFormData = {
  email: string
  password: string
  name: string
}

type RegisterProps = {
  changeTab: () => void
}

const Register: React.FC<RegisterProps> = ({ changeTab }) => {
  const { fetchRegister, error, isLoading } = useRegister()
  const { control, handleSubmit } = useForm<RegisterFormData>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const onSubmit = (data: RegisterFormData) => {
    fetchRegister({ data })
  }

  

  return (
    <form
      className="flex flex-col items-center justify-center p-[10px] h-[100%]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        className="w-[300px]"
        control={control}
        label="Full name"
        name="name"
        required="Required field"
      />
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
        If you have an account, Log In now!
      </button>

      <Button color="primary" type="submit" isLoading={isLoading}>
        Sign Up
      </Button>
    </form>
  )
}

export default Register
