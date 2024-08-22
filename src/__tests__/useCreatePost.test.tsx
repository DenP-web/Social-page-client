import { act, renderHook, waitFor } from "@testing-library/react"
import useCreatePost from "../hooks/useCreatePost"
import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from "../app/services/postsApi"
import { hasErrorField } from "../utils/hasErrorField"

jest.mock("../app/services/postsApi", () => ({
  useCreatePostMutation: jest.fn(),
  useLazyGetAllPostsQuery: jest.fn(),
}))

const mockUseCreatePostMutation = useCreatePostMutation as jest.Mock
const mockUseLazyGetAllPostsQuery = useLazyGetAllPostsQuery as jest.Mock

describe("Custom hook useCreatePost", () => {
  const mockCreatePost = jest.fn()
  const mockTriggerGetAllPosts = jest.fn()

  beforeEach(() => {
    mockCreatePost.mockImplementation(() => ({
      unwrap: jest.fn(),
    }))

    mockUseCreatePostMutation.mockReturnValue([
      mockCreatePost,
      { isError: false, isLoading: false },
    ])

    mockTriggerGetAllPosts.mockImplementationOnce(() => ({
      unwrap: jest.fn(),
    }))

    mockUseLazyGetAllPostsQuery.mockReturnValue([mockTriggerGetAllPosts])
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it("should handle successful post creation", async () => {
    mockCreatePost.mockImplementationOnce(() => ({
      unwrap: jest.fn()
    }))

    const { result } = renderHook(() => useCreatePost())

    await act(async () => {
      await result.current.createPost({ content: "New post content" })
    })

    await waitFor(() => {
      expect(mockCreatePost).toHaveBeenCalledWith({
        content: "New post content",
      })
      expect(mockTriggerGetAllPosts).toHaveBeenCalled()
      expect(result.current.error).toBe("")
    })
  })

  it("should handle errors during post creation", async () => {
    const errorResponse = { data: { message: "Error creating post" } }

    mockCreatePost.mockImplementationOnce(() => ({
      unwrap: jest.fn().mockRejectedValue(errorResponse),
    }))

    mockUseCreatePostMutation.mockReturnValue([
      mockCreatePost,
      { isError: true, isLoading: false },
    ])

    const { result } = renderHook(() => useCreatePost())

    await act(async () => {
      await result.current.createPost({ content: "New post content" })
    })

    await waitFor(() => {
      expect(mockCreatePost).toHaveBeenCalledWith({
        content: "New post content",
      })
      expect(result.current.error).toBe("Error creating post")
    })
  })

  it("should handle loading state", () => {
    mockUseCreatePostMutation.mockReturnValue([
      mockCreatePost,
      { isError: false, isLoading: true },
    ])

    const { result } = renderHook(() => useCreatePost())

    expect(result.current.isLoading).toBe(true)
  })
})
