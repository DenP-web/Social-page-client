import { renderHook, waitFor } from "@testing-library/react"
import { useUnlikeMutation } from "../app/services/likesApi"
import {
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from "../app/services/postsApi"
import { useUnlikePost } from "../hooks"
import { act } from "react"

jest.mock("../app/services/likesApi", () => ({
  useUnlikeMutation: jest.fn(),
}))

jest.mock("../app/services/postsApi", () => ({
  useLazyGetAllPostsQuery: jest.fn(),
  useLazyGetPostByIdQuery: jest.fn(),
}))

const mockUseUnlikeMutation = useUnlikeMutation as jest.Mock
const mockUseLazyGetAllPostQuery = useLazyGetAllPostsQuery as jest.Mock
const mockUseLazyGetPostByIdQuery = useLazyGetPostByIdQuery as jest.Mock

describe("Custom hook useUnlikePost", () => {
  const mockUnlike = jest.fn()
  const mockTriggerGetAllPosts = jest.fn()
  const mockTriggerGetPostById = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockUnlike.mockImplementation(() => ({
      unwrap: jest.fn(),
    }))
    mockTriggerGetAllPosts.mockImplementation(() => ({
      unwrap: jest.fn(),
    }))
    mockTriggerGetPostById.mockImplementation(() => ({
      unwrap: jest.fn(),
    }))

    mockUseUnlikeMutation.mockReturnValue([mockUnlike])
    mockUseLazyGetAllPostQuery.mockReturnValue([mockTriggerGetAllPosts])
    mockUseLazyGetPostByIdQuery.mockReturnValue([mockTriggerGetPostById])
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  describe("should handle successful post unlike", () => {
    it("should call unlike and trigger getPostById", async () => {
      const mockId = "Id"
      const { result } = renderHook(() => useUnlikePost())

      await act(async () => {
        await result.current.fetchUnlikePost(mockId, "getPostById")
      })

      await waitFor(() => {
        expect(mockUnlike).toHaveBeenCalledWith({ postId: mockId })
        expect(mockTriggerGetPostById).toHaveBeenCalled()
        expect(result.current.error).toBe("")
      })
    })
    it("should call unlike and trigger getPostById", async () => {
      const mockId = "Id"
      const { result } = renderHook(() => useUnlikePost())

      await act(async () => {
        await result.current.fetchUnlikePost(mockId, "getAllPost")
      })

      await waitFor(() => {
        expect(mockUnlike).toHaveBeenCalledWith({ postId: mockId })
        expect(mockTriggerGetAllPosts).toHaveBeenCalled()
        expect(result.current.error).toBe("")
      })
    })
  })

  describe("should handle errors during post unlike", () => {
    beforeEach(() => {
      const errorResponse = { data: { message: "Error message" } }
      mockUnlike.mockImplementationOnce(() => ({
        unwrap: jest.fn().mockRejectedValue(errorResponse),
      }))
    })

    it("should handle error when liking post by ID", async () => {
      const mockId = "Id"
      const { result } = renderHook(() => useUnlikePost())

      await act(async () => {
        await result.current.fetchUnlikePost(mockId, "getPostById")
      })

      await waitFor(() => {
        expect(mockUnlike).toHaveBeenCalledWith({ postId: mockId })
        expect(result.current.error).toBe("Error message")
      })
    })
  })
})
