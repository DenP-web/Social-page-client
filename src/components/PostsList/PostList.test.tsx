import "@testing-library/jest-dom"
import PostsList from "."
import { Provider } from "react-redux"
import { render, screen } from "@testing-library/react"
import { useGetAllPostsQuery } from "../../app/services/postsApi"
import { MemoryRouter } from "react-router-dom"
import { Post, User } from "../../app/types"
import { mockStore } from "../../__mocks__/store"

// Mock the module outside the describe block
jest.mock("../../app/services/postsApi")

jest.mock("../../hooks", () => ({
  useDeletePost: jest.fn().mockReturnValue({
    fetchDeletePost: jest.fn(),
  }),
  useLikePost: jest.fn().mockReturnValue({
    fetchLikePost: jest.fn(),
  }),
  useUnlikePost: jest.fn().mockReturnValue({
    fetchUnlikePost: jest.fn(),
  }),
}))

const mockUsers: User[] = [
  {
    id: "1",
    email: "john.doe@example.com",
    password: "password123",
    name: "John Doe",
    avatarUrl: "https://example.com/avatar1.jpg",
    dateOfBirth: "1990-01-01",
    createdAt: new Date(),
    updatedAt: new Date(),
    bio: "Software developer from New York",
    location: "New York, USA",
    posts: [],
    following: [],
    followers: [],
    likes: [],
    comments: [],
    isFollowing: false,
    conversationIDs: ["conv1", "conv2"],
  },
  {
    id: "2",
    email: "jane.smith@example.com",
    name: "Jane Smith",
    createdAt: new Date(),
    updatedAt: new Date(),
    posts: [],
    following: [],
    followers: [],
    likes: [],
    comments: [],
    isFollowing: true,
    conversationIDs: ["conv3"],
  },
]

const mockPosts: Post[] = [
  {
    id: "post1",
    content: "This is a mock post by John Doe",
    author: mockUsers[0],
    authorId: "1",
    likes: [],
    comments: [],
    likedByUser: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "post2",
    content: "This is another mock post by Jane Smith",
    author: mockUsers[1],
    authorId: "2",
    likes: [],
    comments: [],
    likedByUser: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

mockUsers[0].posts.push(mockPosts[0])
mockUsers[1].posts.push(mockPosts[1])

const mockData: { posts: Post[] } = {
  posts: [...mockPosts],
}

const initialStateUser = {
  user: {
    current: mockUsers[0],
    isAuthenticated: true,
  },
  socket: null,
  notification: null,
}

function renderPostListComponent(initialState: any, mockData: any) {
  ;(useGetAllPostsQuery as jest.Mock).mockReturnValue({
    data: mockData,
    isLoading: false,
    isError: false,
  })

  const store = mockStore(initialState)

  render(
    <Provider store={store}>
      <MemoryRouter>
        <PostsList />
      </MemoryRouter>
    </Provider>,
  )
}

describe("PostsList component", () => {
  describe("if data is undefined", () => {

    it("should display a list of posts", () => {
      (useGetAllPostsQuery as jest.Mock).mockReturnValue({
        data: undefined,
      })
      const {container} = render(<PostsList />)
      expect(container.firstChild).toBeNull()
    })
  })


  describe("if posts list is empty", () => {
    beforeEach(() => {
      renderPostListComponent({}, { posts: [] })
    })
    it("should display a list of posts", () => {
      expect(screen.getByText("Sorry, no posts yet")).toBeInTheDocument()
    })
  })

  describe("if posts list is not empty", () => {
    beforeEach(() => {
      renderPostListComponent(initialStateUser, mockData)
    })

    it("should display a list of posts", () => {
      expect(
        screen.getByText("This is a mock post by John Doe"),
      ).toBeInTheDocument()
    })
  })
})
