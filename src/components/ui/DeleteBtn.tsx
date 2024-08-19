import { Spinner } from "@nextui-org/react"
import React from "react"

type DeleteBtnProps = {
  fn: () => void,
  isLoading?: boolean
}

const DeleteBtn: React.FC<DeleteBtnProps> = ({ fn, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <Spinner className="absolute right-1 top-1 w-4 h-4 " />
      ) : (
        <button
          onClick={fn}
          className="absolute right-1 top-1 w-4 h-4 bg-transparent border-none cursor-pointer before:absolute before:content-[''] before:block before:w-full before:h-[1px] before:bg-black before:transform before:rotate-45 after:absolute after:content-[''] after:block after:w-full after:h-[1px] after:bg-black after:transform after:-rotate-45"
        />
      )}
    </>
  )
}

export default DeleteBtn

