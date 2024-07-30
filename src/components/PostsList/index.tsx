import { useGetAllPostsQuery } from "../../app/services/postsApi"
import PostCard from "../PostCard"

const PostsList = () => {
  const { data } = useGetAllPostsQuery()

  if (!data) {
    return null
  }

  return (
    <ul className="flex flex-col items-center gap-4 w-full p-2">
      {data.posts.length === 0 && <p>Sorry, no posts yet</p>}
      {data.posts.map(post => (
        <li key={post.id} className="max-w-[560px] w-full">
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}

export default PostsList
