import { MemoryRouter } from "react-router-dom"
import { mockStore, Provider } from "../../__mocks__/store"
import { useRegister } from "../../hooks"
import Register from "."
import { fireEvent, render, screen, waitFor } from "@testing-library/react"

jest.mock("../../hooks/useRegister")

const mockChangeTab = jest.fn()
const mockUseRegister = useRegister as jest.Mock

const renderRegister = (error: string | null, isLoading: boolean) => {
  mockUseRegister.mockReturnValue({
    fetchRegister: jest.fn(),
    error: error,
    isLoading: isLoading,
  })

  render(<Register changeTab={mockChangeTab} />)
}

describe("Register component", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should render the component", () => {
    renderRegister(null, false)
    expect(screen.getByLabelText(/Full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
    expect(
      screen.getByRole("button", {
        name: /If you have an account, Log In now!/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Sign Up/i })).toBeInTheDocument()
  })

  it("displays validation errors when fields are empty", async () => {
    renderRegister(null, false)

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }))

    await waitFor(() => {
      expect(screen.getAllByText("Required field").length).toBe(3)
    })
  })

  it("calls changeTab when the Log In button is clicked", () => {
    renderRegister(null, false)
    const changeTabBtn = screen.getByRole("button", {
      name: /If you have an account, Log In now!/i,
    })
    fireEvent.click(changeTabBtn)
    expect(mockChangeTab).toHaveBeenCalled()
  })

  it("calls fetchRegister with form data on submit", async () => {
    renderRegister(null, false)
    const { fetchRegister } = mockUseRegister()

    fireEvent.input(screen.getByLabelText("Full name"), {
      target: { value: "John Doe" },
    })
    fireEvent.input(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    })
    fireEvent.input(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    })

    fireEvent.submit(screen.getByRole("button", { name: /sign up/i }))

    await waitFor(() => {
      expect(fetchRegister).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      })
    })
  })

  it("displays an error message when the registration fails", async () => {
    renderRegister('Registration failed', false)

    await waitFor(() => {
      expect(screen.getByText("Registration failed")).toBeInTheDocument()
    })
  })

})
