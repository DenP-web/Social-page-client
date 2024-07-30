import React from 'react'

type ErrorMessageProps ={
  error: string
}

const ErrorMessage:React.FC<ErrorMessageProps> = ({error}) => {
  return (
    <p className='text-red-500 mt-2 text-center'>
      {error}
    </p>
  )
}

export default ErrorMessage
