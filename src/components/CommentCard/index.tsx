import React from "react"
import { Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import { useDeleteComment } from "../../hooks"

import { Avatar, Card, CardBody, CardHeader, Divider } from "@nextui-org/react"
import DeleteBtn from "../ui/DeleteBtn"

import { selectCurrent } from "../../app/selects/userSelects"

import { Comment as TComment } from "../../app/types"
import { BASE_URL, ROUTES } from "../../constants"



type CommentCardProps = {
  comment: TComment
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const { id: postId } = useParams()
  const currentUser = useSelector(selectCurrent)
  const { fetchDeleteComment, error, isLoading } = useDeleteComment()
  const userRoute =
    currentUser?.id === comment.userId
      ? ROUTES.PROFILE_URL
      : ROUTES.USER_URL(comment.userId)
  const deleteComment = (commentId: string) => {
    fetchDeleteComment(commentId, postId)
  }

  return (
    <Card className="max-w-[400px]">
      <CardHeader>
        <Link to={userRoute} className="flex gap-3 items-center">
          <Avatar
            alt="nextui logo"
            radius="sm"
            src={BASE_URL + comment.user.avatarUrl}
          />
          <div className="flex flex-col">
            <p className="text-md">{comment.user.name}</p>
          </div>
        </Link>
        {comment.userId === currentUser?.id ? (
          <DeleteBtn fn={() => deleteComment(comment.id)} />
        ) : null}
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{comment.content}</p>
      </CardBody>
    </Card>
  )
}

export default CommentCard
