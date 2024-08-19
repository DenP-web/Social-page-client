import React from "react"
import { Input as NextInput } from "@nextui-org/react"
import { Control, useController } from "react-hook-form"

type InputProps = {
  placeholder?: string
  type?: string
  name: string
  label?: string
  control?: Control<any>
  required?: string
  className?: string
}
const patterns: { [key: string]: { value: RegExp; message: string } } = {
  email: {
    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: "Invalid email address",
  },
  password: {
    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message:
      "Password must be at least 8 characters long and contain at least one letter and one number",
  },
  name: {
    message: "Name must contain more than one word and only English letters",
    value: /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/,
  },
}

const Input: React.FC<InputProps> = ({
  name,
  control,
  label,
  placeholder,
  required = "This field can't be empty",
  type,
  className,
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: { required, pattern: patterns[name] },
  })

  return (
    <NextInput
      id={field.name}
      label={label}
      type={type}
      placeholder={placeholder}
      className={className}
      value={field.value}
      name={field.name}
      isInvalid={invalid}
      variant="underlined"
      onChange={field.onChange}
      onBlur={field.onBlur}
      errorMessage={`${errors[name]?.message ? errors[name]?.message : ""}`}
    />
  )
}

export default Input
