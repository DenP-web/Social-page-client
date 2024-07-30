import React from "react"
import { Comment as TComment } from "../../app/types"
import CommentCard from "../CommentCard"

type CommentsListProps = {
  comments: TComment[]
}

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  if (!comments) {
    return null
  }

  return (
    <ul className=" max-w-[450px] w-full gap-2 ">
      {comments.map(comment => (
        <li className="mb-2" key={comment.id}>
          <CommentCard comment={comment} />
        </li>
      ))}
    </ul>
  )
}

export default CommentsList
