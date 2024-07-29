import { Textarea as NextTextArea } from "@nextui-org/react"
import React from "react"
import { Control, useController } from "react-hook-form"

type TextareaProps = {
  name: string
  label?: string
  requiredMessage: string
  placeholder?: string
  classNames: string
  control: Control<any>
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  label,
  requiredMessage,
  placeholder,
  classNames,
  control,
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: { required: requiredMessage },
  })

  return (
    <NextTextArea
      variant="bordered"
      labelPlacement="outside"
      id={field.name}
      label={label}
      placeholder={placeholder}
      className={classNames}
      value={field.value}
      name={field.name}
      isInvalid={invalid}
      onChange={field.onChange}
      onBlur={field.onBlur}
      errorMessage={`${errors[name]?.message ? errors[name]?.message : ""}`}
    />
  )
}

export default Textarea
