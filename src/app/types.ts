

export type User = {
  id: string
  email: string
  password?: string
  name?: string
  avatarUrl?: string
  dateOfBirth?: string
  createdAt: Date
  updatedAt: Date
  bio?: string
  location?: string
  posts: Post[]
  following: Follow[]
  followers: Follow[]
  likes: Like[]
  comments: Comment[]
  isFollowing?: boolean
  conversationIDs?: string[]
}

export type Follow = {
  id: string
  follower: User
  followerId: string
  following: User
  followingId: string
}

export type Post = {
  id: string
  content: string
  author: User
  authorId: string
  likes: Like[]
  comments: Comment[]
  likedByUser: boolean
  createdAt: Date
  updatedAt: Date
}

export type Like = {
  id: string
  user: User
  userId: string
  post: Post
  postId: string
}

export type Comment = {
  id: string
  content: string
  user: User
  userId: string
  post: Post
  postId: string
}

export type TDataUpdateUser = {
  name: string | undefined
  bio: string | undefined
  location: string | undefined
  dateOfBirth: string | undefined
}


export type TMessage = {
  id: string,
  senderId: string
  receiverId: string
  sender: User
  receiver: User
  message: string,
  createdAt: string,
  updatedAt: string,
  conversationId: string
}

export type TConversation = {
  "id": string
  "createdAt": string
  "updatedAt": string
  "participantsIDs": string[]
  "participants": User[]
}

