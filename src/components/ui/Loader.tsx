import { Spinner } from "@nextui-org/react"

const Loader = () => {


  return (
    <div className="w-full h-full bg-white absolute left-0 right-0 top-0 bottom-0 z-50 flex justify-center items-center" >
      <Spinner label="Loading..." color="primary" />
    </div>
  )
}

export default Loader
