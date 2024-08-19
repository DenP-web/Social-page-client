import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { routes } from "./routes"

const router = createBrowserRouter(routes)

const AppRouter = () => <RouterProvider router={router} />

export default AppRouter
