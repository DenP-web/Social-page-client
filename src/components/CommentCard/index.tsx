import React from "react"
import { Comment as TComment } from "../../app/types"
import { Avatar, Card, CardBody, CardHeader, Divider } from "@nextui-org/react"
import { BASE_URL, ROUTES } from "../../constants"
import DeleteBtn from "../ui/DeleteBtn"
import { Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrent } from "../../app/selects/userSelects"
import { useDeleteComment } from "../../hooks"

type CommentCardProps = {
  comment: TComment
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const { id: postId } = useParams()
  const currentUser = useSelector(selectCurrent)
  const { fetchDeleteComment, error, isLoading } = useDeleteComment()

  const deleteComment = (commentId: string) => {
    fetchDeleteComment(commentId, postId)
  }

  return (
    <Card className="max-w-[400px]">
      <CardHeader>
        <Link
          to={ROUTES.USER_URL(
            currentUser?.id === comment.userId ? undefined : comment.userId,
          )}
          className="flex gap-3 items-center"
        >
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
