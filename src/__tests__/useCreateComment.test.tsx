import { act } from "react"
import { renderHook, waitFor } from "@testing-library/react"
import { useCreateCommentMutation } from "../app/services/commentsApi"
import { useLazyGetPostByIdQuery } from "../app/services/postsApi"
import useCreateComment from "../hooks/useCreateComment"

jest.mock("../app/services/postsApi", () => ({
  useLazyGetPostByIdQuery: jest.fn(),
}))

jest.mock("../app/services/commentsApi", () => ({
  useCreateCommentMutation: jest.fn(),
}))

const mockUseLazyGetPostByIdQuery = useLazyGetPostByIdQuery as jest.Mock
const mockUseCreateCommentMutation = useCreateCommentMutation as jest.Mock

describe("Custom hook useCreateComment", () => {
  const mockCreateComment = jest.fn()
  const mockTriggerGetPostById = jest.fn()
  const mockData = {
    postId: "id",
    content: "Hello",
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockCreateComment.mockImplementation(() => ({
      unwrap: jest.fn(),
    }))
    mockTriggerGetPostById.mockImplementation(() => ({
      unwrap: jest.fn(),
    }))

    mockUseCreateCommentMutation.mockReturnValue([
      mockCreateComment,
      { isLoading: false },
    ])
    mockUseLazyGetPostByIdQuery.mockReturnValue([mockTriggerGetPostById])
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it("should call fetchCreateComment successful", async () => {
    const { result } = renderHook(() => useCreateComment())

    await act(async () => {
      await result.current.fetchCreateComment(mockData)
    })

    await waitFor(() => {
      expect(mockCreateComment).toHaveBeenCalledWith(mockData)
      expect(mockTriggerGetPostById).toHaveBeenCalled()
      expect(result.current.error).toBe("")
    })
  })

  it("should handle loading state", () => {
    mockUseCreateCommentMutation.mockReturnValue([
      mockCreateComment,
      { isLoading: true },
    ])

    const { result } = renderHook(() => useCreateComment())
    expect(result.current.isLoading).toBe(true)
  })

  describe("should handle errors during create comment", () => {
    beforeEach(() => {
      const errorResponse = { data: { message: "Error message" } }
      mockCreateComment.mockImplementationOnce(() => ({
        unwrap: jest.fn().mockRejectedValue(errorResponse),
      }))
    })

    it("should handle error when comment creating by Data", async () => {
      const { result } = renderHook(() => useCreateComment())

      await act(async () => {
        await result.current.fetchCreateComment(mockData)
      })

      await waitFor(() => {
        expect(mockCreateComment).toHaveBeenCalledWith(mockData)
        expect(result.current.error).toBe("Error message")
      })
    })
  })
})
