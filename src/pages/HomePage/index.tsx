import React from 'react'
import AddNewPost from '../../components/AddNewPost'
import PostsList from '../../components/PostsList'

const HomePage = () => {
  return (
    <main className='flex flex-col items-center w-full gap-6'>
      <AddNewPost />
      <PostsList />
    </main>
  )
}

export default HomePage
