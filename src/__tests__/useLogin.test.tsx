import { useNavigate } from "react-router-dom"
import { renderHook, waitFor } from "@testing-library/react"
import { useLogin } from "../hooks"
import { useLoginMutation } from "../app/services/userApi"
import { act } from "react"
import { ROUTES } from "../constants"

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}))

jest.mock("../app/services/userApi", () => ({
  useLoginMutation: jest.fn(),
}))

const mockUseNavigate = useNavigate as jest.Mock
const mockUseLoginMutation = useLoginMutation as jest.Mock

describe("Custom hook useLogin", () => {
  const mockLogin = jest.fn()
  const mockLoginData = {
    email: "test@test.ua",
    password: "q123123123",
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockLogin.mockImplementation(() => ({
      unwrap: jest.fn(),
    }))

    mockUseLoginMutation.mockReturnValue([mockLogin, { isLoading: false }])
    mockUseNavigate.mockReturnValue(jest.fn())
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it("should call fetchLogin successful", async () => {
    const { result } = renderHook(() => useLogin())
    await act(async () => {
      await result.current.fetchLogin(mockLoginData)
    })

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(mockLoginData)
    })
  })

  it("should call navigate if login work successful", async () => {
    const navigate = mockUseNavigate()
    const { result } = renderHook(() => useLogin())
    await act(async () => {
      await result.current.fetchLogin(mockLoginData)
    })

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith(ROUTES.HOME_URL)
    })
  })

  it("should call navigate if login work successful", async () => {
    const navigate = mockUseNavigate()
    const { result } = renderHook(() => useLogin())
    await act(async () => {
      await result.current.fetchLogin(mockLoginData)
    })

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith(ROUTES.HOME_URL)
    })
  })

  it("should handle loading state", async () => {
    mockUseLoginMutation.mockReturnValue([mockLogin, { isLoading: true }])
    const { result } = renderHook(() => useLogin())
    expect(result.current.isLoading).toBe(true)
  })

  it("should handle errors during login", async () => {
    const errorResponse = { data: { message: "Error message" } }
    mockLogin.mockImplementation(() => ({
      unwrap: jest.fn().mockRejectedValue(errorResponse),
    }))

    const { result } = renderHook(() => useLogin())
    await act(async () => {
      await result.current.fetchLogin(mockLoginData)
    })
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(mockLoginData)
      expect(result.current.error).toBe("Error message")
    })
  })
})
