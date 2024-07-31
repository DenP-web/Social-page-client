import React from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react"
import DeleteBtn from "../ui/DeleteBtn"

import { BASE_URL, ROUTES } from "../../constants"

import { useDeletePost, useLikePost, useUnlikePost } from "../../hooks"

import { Post } from "../../app/types"
import {
  selectAuthenticated,
  selectCurrent,
} from "../../app/selects/userSelects"

import likeRedSvg from "./images/like-red.svg"
import likeBlackSvg from "./images/like-black.svg"
import commentSvg from "./images/comment.svg"

type PostCardProps = {
  post: Post
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigate = useNavigate()
  const { id: postId } = useParams()
  const currentUser = useSelector(selectCurrent)
  const isAuth = useSelector(selectAuthenticated)
  const canDelete = post.authorId === currentUser?.id
  const userRoute =
    currentUser?.id === post.author.id
      ? ROUTES.PROFILE_URL
      : ROUTES.USER_URL(post.author.id)

  const { fetchDeletePost, error: deletePostError } = useDeletePost()
  const { fetchLikePost, error: likePostError } = useLikePost()
  const { fetchUnlikePost, error: unlikePostError } = useUnlikePost()

  const deletePostHandle = (id: string) => {
    fetchDeletePost(id)
  }

  const likeFeaturesHandle = (id: string) => {
    if (!isAuth) {
      navigate(ROUTES.REGISTRATION_URL)
      return null
    }
    const typeTriggerData: string = postId ? "getById" : "getAllPost"
    post.likedByUser
      ? fetchUnlikePost(id, typeTriggerData)
      : fetchLikePost(id, typeTriggerData)
  }

  return (
    <Card className="w-full max-w-[800px] ">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={BASE_URL + post.author.avatarUrl}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <Link
              className="text-small font-semibold leading-none text-default-600"
              to={userRoute}
            >
              {post.author.name}
            </Link>
          </div>

          {canDelete && <DeleteBtn fn={() => deletePostHandle(post.id)} />}
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>{post.content}</p>
      </CardBody>
      <CardFooter className="flex gap-4">
        <div
          className="flex gap-1 cursor-pointer"
          onClick={() => likeFeaturesHandle(post.id)}
        >
          <img
            className="max-w-[16px] w-full"
            src={post.likedByUser ? likeRedSvg : likeBlackSvg}
            alt="Like comment"
          />
          <button className=" font-semibold text-default-400 text-small">
            {post.likes.length}
          </button>
        </div>
        <Link
          to={ROUTES.POST_URL(post.id)}
          className="flex gap-1 cursor-pointer"
        >
          <img
            className="max-w-[16px] w-full"
            src={commentSvg}
            alt="Comment Image"
          />
          <p className=" font-semibold text-default-400 text-small">
            {post.comments.length}
          </p>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default PostCard
