import { renderHook, waitFor } from "@testing-library/react"
import { useLikePost } from "../hooks"
import {
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from "../app/services/postsApi"
import { useLikeMutation } from "../app/services/likesApi"
import { act } from "react"

jest.mock("../app/services/likesApi", () => ({
  useLikeMutation: jest.fn(),
}))

jest.mock("../app/services/postsApi", () => ({
  useLazyGetAllPostsQuery: jest.fn(),
  useLazyGetPostByIdQuery: jest.fn(),
}))

const mockUseLikeMutation = useLikeMutation as jest.Mock
const mockUseLazyGetAllPostsQuery = useLazyGetAllPostsQuery as jest.Mock
const mockUseLazyGetPostByIdQuery = useLazyGetPostByIdQuery as jest.Mock

describe("Custom hook useLikePost", () => {
  const mockLike= jest.fn()
  const mockTriggerGetAllPosts = jest.fn()
  const mockTriggerGetPostById = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockLike.mockImplementation(() => ({
      unwrap: jest.fn(),
    }))
    mockTriggerGetAllPosts.mockImplementation(() => ({
      unwrap: jest.fn(),
    }))
    mockTriggerGetPostById.mockImplementation(() => ({
      unwrap: jest.fn(),
    }))
    mockUseLikeMutation.mockReturnValue([mockLike])
    mockUseLazyGetAllPostsQuery.mockReturnValue([mockTriggerGetAllPosts])
    mockUseLazyGetPostByIdQuery.mockReturnValue([mockTriggerGetPostById])
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  describe("should handle successful post like", () => {
    it("should call like and trigger getPostById", async () => {
      const mockId = "Id"
      const { result } = renderHook(() => useLikePost())

      await act(async () => {
        await result.current.fetchLikePost(mockId, "getPostById")
      })

      await waitFor(() => {
        expect(mockLike).toHaveBeenCalledWith({ postId: mockId })
        expect(mockTriggerGetPostById).toHaveBeenCalled()
        expect(result.current.error).toBe("")
      })
    })

    it("should call like and trigger getAllPosts", async () => {
      const mockId = "Id"
      const { result } = renderHook(() => useLikePost())

      await act(async () => {
        await result.current.fetchLikePost(mockId, "getAllPost")
      })

      await waitFor(() => {
        expect(mockLike).toHaveBeenCalledWith({ postId: mockId })
        expect(mockTriggerGetAllPosts).toHaveBeenCalled()
        expect(result.current.error).toBe("")
      })
    })
  })

  describe("should handle errors during post like", () => {
    beforeEach(() => {
      const errorResponse = { data: { message: "Error message" } }
      mockLike.mockImplementationOnce(() => ({
        unwrap: jest.fn().mockRejectedValue(errorResponse),
      }))
    })

    it("should handle error when liking post by ID", async () => {
      const mockId = "Id"
      const { result } = renderHook(() => useLikePost())

      await act(async () => {
        await result.current.fetchLikePost(mockId, "getPostById")
      })

      await waitFor(() => {
        expect(mockLike).toHaveBeenCalledWith({ postId: mockId })
        expect(result.current.error).toBe("Error message")
      })
    })
  })
})
