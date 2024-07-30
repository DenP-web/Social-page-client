import React from 'react'
import AddNewPost from '../../components/AddNewPost'
import PostsList from '../../components/PostsList'
import { useSelector } from 'react-redux'
import { selectAuthenticated } from '../../app/selects/userSelects'

const HomePage = () => {
  const isAuth = useSelector(selectAuthenticated)

  return (
    <main className='flex flex-col items-center w-full gap-6'>
      {isAuth && <AddNewPost />}
      <PostsList />
    </main>
  )
}

export default HomePage
