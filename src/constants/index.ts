export const BASE_URL = 'http://localhost:3000'

export const ROUTES = {
  HOME_URL: '/',
  REGISTRATION_URL: '/register',
  POST_URL: (id: string) => `/post/${id}`,
  USER_URL: (id?: string) => `/user${id ? '/'+id : ""}`,
  FOLLOWER_URL: '/follower',
  FOLLOWING_URL: '/following'
}