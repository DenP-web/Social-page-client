import { User } from "../types";
import { api } from "./api";

// const userUrlApi = api.
export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string },
      { email: string, password: string }
    >({
      query: (userData) => ({
        url: '/user/login',
        method: 'POST',
        body: userData
      })
    }),
    register: builder.mutation<User, { email: string, password: string, name: string }>({
      query: (userData) => ({
        url: '/user/register',
        method: 'POST',
        body: userData
      })
    }),
    currentUser: builder.query<User, void>({
      query: () => ({
        url: '/user',
        method: 'GET'
      })
    }),
    getUserById: builder.query<User, { id: string }>({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: 'GET'
      })
    }),
    updateUser: builder.mutation<User, { userData: FormData, id: string }>({
      query: ({ userData, id }) => ({
        url: `/user/${id}`,
        method: 'PUT',
        body: userData
      })
    })
  }),
})

export const { useCurrentUserQuery, useRegisterMutation, useGetUserByIdQuery, useLoginMutation, useUpdateUserMutation, useLazyCurrentUserQuery, useLazyGetUserByIdQuery } = userApi 
export const {endpoints: {login, register, currentUser, getUserById, updateUser}} = userApi