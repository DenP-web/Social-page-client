import React from "react"
import { useGetPostByIdQuery } from "../../app/services/postsApi"
import { useParams } from "react-router-dom"
import { Spinner } from "@nextui-org/react"
import PostCard from "../../components/PostCard"
import Textarea from "../../components/ui/TextArea"
import AddNewComment from "../../components/AddNewComment"
import CommentsList from "../../components/CommentsList"

const PostPage = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetPostByIdQuery({ id: id ? id : "" })

  if (isLoading) {
    return <Spinner color="success" />
  }

  if (!data) {
    return null
  }

  return (
    <main className="flex flex-col items-center p-2 gap-8">
      <PostCard post={data.post} />
      <AddNewComment postId={data.post.id} />
      <CommentsList comments={data.post.comments} />
     </main>
  )
}

export default PostPage
