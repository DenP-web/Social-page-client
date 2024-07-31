import { ROUTES } from "../constants"
import {
  HomePage,
  PostPage,
  UserPage,
  FollowerPage,
  FollowingPage,
  RegisterPage,
  ProfilePage,
} from "../pages"
import ProtectedRoute from "./ProtectedRoute"
import RootPage from "./RootPage"

export const routes = [
  {
    path: ROUTES.HOME_URL,
    element: <RootPage />,
    children: [
      {
        path: ROUTES.HOME_URL,
        element: <HomePage />,
      },
      {
        path: ROUTES.REGISTRATION_URL,
        element: (
          <ProtectedRoute allowedRoles={["GUEST"]}>
            <RegisterPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.POST_URL(":id"),
        element: (
          <ProtectedRoute
            allowedRoles={["USER"]}
            navigateTo={ROUTES.REGISTRATION_URL}
          >
            <PostPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.USER_URL(":id"),
        element: (
          <ProtectedRoute
            allowedRoles={["USER"]}
            navigateTo={ROUTES.REGISTRATION_URL}
          >
            <UserPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.PROFILE_URL,
        element: (
          <ProtectedRoute
            allowedRoles={["USER"]}
            navigateTo={ROUTES.REGISTRATION_URL}
          >
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.FOLLOWER_URL(':id'),
        element: (
          <ProtectedRoute
            allowedRoles={["USER"]}
            navigateTo={ROUTES.REGISTRATION_URL}
          >
            <FollowerPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.FOLLOWING_URL(':id'),
        element: (
          <ProtectedRoute
            allowedRoles={["USER"]}
            navigateTo={ROUTES.REGISTRATION_URL}
          >
            <FollowingPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]
