export const BASE_URL = 'http://localhost:3000'

export const ROUTES = {
  HOME_URL: '/',
  PROFILE_URL: '/user',
  REGISTRATION_URL: '/register',
  CONVERSATIONS_URL: `/conversation`,
  POST_URL: (id: string) => `/post/${id}`,
  USER_URL: (id: string) => `/user/${id}`,
  FOLLOWER_URL: (id: string) => `/follower/${id}`,
  FOLLOWING_URL: (id: string) => `/following/${id}`,
}