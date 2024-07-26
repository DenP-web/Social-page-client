import React, { useState } from "react"
import { useForm } from "react-hook-form"
import Input from "../ui/Input"
import ErrorMessage from "../ui/ErrorMessage"
import { Button } from "@nextui-org/react"

type Register = {
  email: string
  password: string
  name: string
}

type RegisterProps = {
  changeTab: () => void
}

const Register: React.FC<RegisterProps> = ({ changeTab }) => {
  const [error, setError] = useState<string>("")
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const onSubmit = (data: Register) => {
    console.log(data)
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

      <Button color="primary" type="submit">
        Sign Up
      </Button>
    </form>
  )
}

export default Register
