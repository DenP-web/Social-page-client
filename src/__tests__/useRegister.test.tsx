import { useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../app/services/userApi"
import { renderHook, waitFor } from "@testing-library/react"
import { useRegister } from "../hooks"
import { act } from "react"
import { ROUTES } from "../constants"

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}))

jest.mock("../app/services/userApi", () => ({
  useRegisterMutation: jest.fn(),
}))

const mockUseNavigate = useNavigate as jest.Mock
const mockUseRegisterMutation = useRegisterMutation as jest.Mock

describe("Custom hook useRegister", () => {
  const mockRegister = jest.fn()
  const mockRegisterData = {
    name: "test",
    email: "test@test.ua",
    password: "q123123123",
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockRegister.mockImplementation(() => ({
      unwrap: jest.fn(),
    }))
    mockUseRegisterMutation.mockReturnValue([
      mockRegister,
      { isLoading: false },
    ])
    mockUseNavigate.mockReturnValue(jest.fn())
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it("should call fetchRegister successful", async () => {
    const { result } = renderHook(() => useRegister())

    await act(async () => {
      await result.current.fetchRegister(mockRegisterData)
    })

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith(mockRegisterData)
    })
  })

  it("should call navigate if register work successful", async () => {
    const navigate = mockUseNavigate()
    const { result } = renderHook(() => useRegister())
    await act(async () => {
      await result.current.fetchRegister(mockRegisterData)
    })
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith(ROUTES.HOME_URL)
    })
  })

  it("should handle loading state", () => {
    mockUseRegisterMutation.mockReturnValue([mockRegister, { isLoading: true }])
    const { result } = renderHook(() => useRegister())
    expect(result.current.isLoading).toBe(true)
  })

  it("should handle errors during register", async () => {
    const errorResponse = { data: { message: "Error message" } }
    mockRegister.mockImplementation(() => ({
      unwrap: jest.fn().mockRejectedValue(errorResponse),
    }))
    const { result } = renderHook(() => useRegister())
    await act(async () => {
      await result.current.fetchRegister(mockRegisterData)
    })

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith(mockRegisterData)
      expect(result.current.error).toBe("Error message")
    })
  })
})
