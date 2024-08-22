import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import AddNewPost from "."
import { Provider } from "react-redux"
import { mockStore } from "../../__mocks__/store"
import { MemoryRouter } from "react-router-dom"
import { useCreatePost } from "../../hooks"

jest.mock("../../hooks/useCreatePost", () => ({
  __esModule: true,
  default: jest.fn(),
}))

const mockUseCreatePost = useCreatePost as jest.Mock

const renderAddNewPost = (error: string | null, isLoading: boolean) => {
  mockUseCreatePost.mockReturnValue({
    createPost: jest.fn(),
    error: error,
    isLoading: isLoading,
  })

  const store = mockStore({})

  render(
    <Provider store={store}>
      <MemoryRouter>
        <AddNewPost />
      </MemoryRouter>
    </Provider>,
  )
}

describe("AddNewPost component", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should render the component", () => {
    renderAddNewPost(null, false)
    expect(screen.getByLabelText(/Add new post/i)).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText(/Enter your description/i),
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Add/i })).toBeInTheDocument()
  })

  it("should call createPost with correct data on form submission", async () => {
    renderAddNewPost(null, false)
    const { createPost } = mockUseCreatePost()

    const textarea = screen.getByPlaceholderText(/Enter your description/i)
    const button = screen.getByRole("button", { name: /Add/i })

    fireEvent.change(textarea, { target: { value: "This is a new post" } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(createPost).toHaveBeenCalledWith({ content: "This is a new post" })
    })
  })

  it("should display error message if error is present", () => {
    renderAddNewPost("Failed to create post", false)
    expect(screen.getByText(/Failed to create post/i)).toBeInTheDocument()
  })

  it("should disable the button and show loading state when isLoading is true", () => {
    renderAddNewPost(null, true)

    const button = screen.getByRole("button", { name: /Add/i })
    expect(button).toHaveAttribute("data-loading", "true")
  })
})
