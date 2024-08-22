import {
  fireEvent,
  getByTestId,
  render,
  screen,
  waitFor,
} from "@testing-library/react"
import { Provider } from "react-redux"
import { mockStore } from "../../__mocks__/store"
import { MemoryRouter, useNavigate, useParams } from "react-router-dom"
import PostCard from "."
import { Post } from "../../app/types"
import { useDeletePost, useLikePost, useUnlikePost } from "../../hooks"
import { ROUTES } from "../../constants"

const mockUserAuthor = {
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
}

const mockUserAnother = {
  id: "2",
  email: "2john.doe@example.com",
  password: "password123",
  name: "2John Doe",
  avatarUrl: "2https://example.com/avatar1.jpg",
  dateOfBirth: "1990-01-12",
  createdAt: new Date(),
  updatedAt: new Date(),
  bio: "2 Software developer from New York",
  location: "2 New York, USA",
  posts: [],
  following: [],
  followers: [],
  likes: [],
  comments: [],
  isFollowing: false,
  conversationIDs: ["conv1", "conv2"],
}

const mockPost: Post = {
  id: "post1",
  content: "This is a mock post by John Doe",
  author: mockUserAuthor,
  authorId: "1",
  likes: [],
  comments: [],
  likedByUser: false,
  createdAt: new Date(),
  updatedAt: new Date(),
}

jest.mock("../../hooks", () => ({
  useDeletePost: jest.fn(),
  useLikePost: jest.fn(),
  useUnlikePost: jest.fn(),
}))

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}))

const mockUseDeletePost = useDeletePost as jest.Mock
const mockUseLikePost = useLikePost as jest.Mock
const mockUseUnlikePost = useUnlikePost as jest.Mock

const mockUseParams = useParams as jest.Mock
const mockUseNavigate = useNavigate as jest.Mock

describe("PostCard component", () => {
  beforeAll(() => {
    mockUseDeletePost.mockReturnValue({ fetchDeletePost: jest.fn() })
    mockUseLikePost.mockReturnValue({ fetchLikePost: jest.fn() })
    mockUseUnlikePost.mockReturnValue({ fetchUnlikePost: jest.fn() })

    mockUseNavigate.mockReturnValue(jest.fn())
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  describe("When the user is not authenticated", () => {
    it("should redirect to the registration page when user click on like btn", async () => {
      const navigate = mockUseNavigate()
      const store = mockStore({
        user: { current: null, isAuthenticated: false },
      })

      render(
        <Provider store={store}>
          <MemoryRouter>
            <PostCard post={mockPost} />
          </MemoryRouter>
        </Provider>,
      )

      const likeBtn = screen.getByTestId("likeBtn")
      fireEvent.click(likeBtn)

      expect(navigate).toHaveBeenCalledWith(ROUTES.REGISTRATION_URL)
    })
  })

  describe("When the user is authenticated", () => {
    describe("delete post", () => {
      describe("when user is author", () => {
        beforeEach(() => {
          const store = mockStore({
            user: { current: mockUserAuthor, isAuthenticated: true },
          })

          render(
            <Provider store={store}>
              <MemoryRouter>
                <PostCard post={mockPost} />
              </MemoryRouter>
            </Provider>,
          )
        })

        it("should deleteBtn rendered", () => {
          const deleteBtn = screen.getByTestId("deleteBtn")
          expect(deleteBtn).toBeInTheDocument()
        })
        it("should deleteBtn on click run deletePostHandle function", () => {
          const { fetchDeletePost } = mockUseDeletePost()
          const deleteBtn = screen.getByTestId("deleteBtn")
          fireEvent.click(deleteBtn)
          expect(fetchDeletePost).toHaveBeenCalledWith(mockPost.id)
        })
      })

      describe("when user is not author", () => {
        beforeEach(() => {
          const store = mockStore({
            user: { current: mockUserAnother, isAuthenticated: true },
          })

          render(
            <Provider store={store}>
              <MemoryRouter>
                <PostCard post={mockPost} />
              </MemoryRouter>
            </Provider>,
          )
        })

        it("should deleteBtn rendered", () => {
          const deleteBtn = screen.queryByText("deleteBtn")
          expect(deleteBtn).toBeNull()
        })
      })
    })

    describe("like and unlike post", () => {
      describe("home page", () => {
        beforeAll(() => {
          mockUseParams.mockReturnValue({})
        })
        afterAll(() => {
          jest.clearAllMocks()
        })

        it("like post", () => {
          const { fetchLikePost } = mockUseLikePost()
          const store = mockStore({
            user: { current: mockUserAuthor, isAuthenticated: true },
          })
          mockPost.likedByUser = false
          render(
            <Provider store={store}>
              <MemoryRouter>
                <PostCard post={mockPost} />
              </MemoryRouter>
            </Provider>,
          )

          const likeBtn = screen.getByTestId("likeBtn")
          fireEvent.click(likeBtn)
          expect(fetchLikePost).toHaveBeenCalledWith(mockPost.id, "getAllPost")
        })

        it("unlike post", () => {
          const { fetchUnlikePost } = mockUseUnlikePost()
          const store = mockStore({
            user: { current: mockUserAuthor, isAuthenticated: true },
          })
          mockPost.likedByUser = true
          render(
            <Provider store={store}>
              <MemoryRouter>
                <PostCard post={mockPost} />
              </MemoryRouter>
            </Provider>,
          )
          const likeBtn = screen.getByTestId("likeBtn")
          fireEvent.click(likeBtn)
          expect(fetchUnlikePost).toHaveBeenCalledWith(
            mockPost.id,
            "getAllPost",
          )
        })
      })

      describe("post page", () => {
        beforeAll(() => {
          mockUseParams.mockReturnValue({ id: mockPost.id })
        })
        afterAll(() => {
          jest.clearAllMocks()
        })
        it("like post", () => {
          const { fetchLikePost } = mockUseLikePost()
          const store = mockStore({
            user: { current: mockUserAuthor, isAuthenticated: true },
          })
          mockPost.likedByUser = false
          render(
            <Provider store={store}>
              <MemoryRouter>
                <PostCard post={mockPost} />
              </MemoryRouter>
            </Provider>,
          )

          const likeBtn = screen.getByTestId("likeBtn")
          fireEvent.click(likeBtn)
          expect(fetchLikePost).toHaveBeenCalledWith(mockPost.id, "getPostById")
        })

        it("unlike post", () => {
          const { fetchUnlikePost } = mockUseUnlikePost()
          const store = mockStore({
            user: { current: mockUserAuthor, isAuthenticated: true },
          })
          mockPost.likedByUser = true
          render(
            <Provider store={store}>
              <MemoryRouter>
                <PostCard post={mockPost} />
              </MemoryRouter>
            </Provider>,
          )
          const likeBtn = screen.getByTestId("likeBtn")
          fireEvent.click(likeBtn)
          expect(fetchUnlikePost).toHaveBeenCalledWith(
            mockPost.id,
            "getPostById",
          )
        })
      })
    })
  })
})
