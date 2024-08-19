import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import Header from "."
import { MemoryRouter } from "react-router-dom"
import { mockStore, Provider } from "../../__mocks__/store"
import { BASE_URL } from "../../constants"

const initialStateEmpty = {
  user: {},
  socket: {},
  notification: {},
}
const initialStateUser = {
  user: {
    current: {
      id: "1",
      name: "John Biber",
      avatarUrl: "",
    },
  },
  socket: {},
  notification: {},
}

const renderHeaderWithState = (state: any) => {
  const store = mockStore(state)
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>,
  )
}
describe("Header component", () => {
  describe("should render if current user don't login", () => {
    beforeEach(() => {
      renderHeaderWithState(initialStateEmpty)
    })

    it("renders without crashing", () => {
      expect(screen.getByText("DeDigger")).toBeInTheDocument()
    })

    it("renders all menu items", () => {
      expect(screen.getByText("Home")).toBeInTheDocument()
      expect(screen.getByText("Messages")).toBeInTheDocument()
      expect(screen.getByText("Following")).toBeInTheDocument()
      expect(screen.getByText("Follower")).toBeInTheDocument()
    })

    it("should handle mobile menu interaction", async () => {
      // open menu
      fireEvent.click(screen.getByLabelText("Open menu"))
      expect(screen.getByLabelText("Close menu")).toBeInTheDocument()

      // close menu
      fireEvent.click(screen.getByLabelText("Close menu"))
      await waitFor(() =>
        expect(screen.getByLabelText("Open menu")).toBeInTheDocument(),
      )
    })

    it("render user avatar", () => {
      const avatar = screen.getByRole("img")
      expect(avatar).toBeInTheDocument()
      expect(avatar).toHaveAttribute("src", BASE_URL + undefined)
    })

    it("render user name", () => {
      const username = screen.getByTestId("username")
      expect(username.textContent).toBe("")
    })
  })

  describe("should render if current user login", () => {
    beforeEach(() => {
      renderHeaderWithState(initialStateUser)
    })

    it("renders without crashing", () => {
      expect(screen.getByText("DeDigger")).toBeInTheDocument()
    })

    it("renders all menu items", () => {
      expect(screen.getByText("Home")).toBeInTheDocument()
      expect(screen.getByText("Messages")).toBeInTheDocument()
      expect(screen.getByText("Following")).toBeInTheDocument()
      expect(screen.getByText("Follower")).toBeInTheDocument()
    })

    it("should handle mobile menu interaction", async () => {
      // open menu
      fireEvent.click(screen.getByLabelText("Open menu"))
      expect(screen.getByLabelText("Close menu")).toBeInTheDocument()

      // close menu
      fireEvent.click(screen.getByLabelText("Close menu"))
      await waitFor(() =>
        expect(screen.getByLabelText("Open menu")).toBeInTheDocument(),
      )
    })

    it("render user avatar", () => {
      const avatar = screen.getByRole("img")
      expect(avatar).toBeInTheDocument()
      expect(avatar).toHaveAttribute(
        "src",
        BASE_URL + initialStateUser.user.current.avatarUrl,
      )
    })

    it("render user name", () => {
      const username = screen.getByTestId("username")
      expect(username.textContent).toBe(initialStateUser.user.current.name)
    })
  })
})
