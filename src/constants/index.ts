export const BASE_URL = 'http://localhost:3000'

export const ROUTES = {
  HOME_URL: '/',
  REGISTRATION_URL: '/register',
  POST_URL: (id: string) => `/post/${id}`,
  USER_URL: (id: string) => `/user/${id}`,
  PROFILE_URL: '/user',
  FOLLOWER_URL: (id: string) => `/follower/${id}`,
  FOLLOWING_URL: (id: string) => `/following/${id}`
}