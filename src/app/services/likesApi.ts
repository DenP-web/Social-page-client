import { Like } from "../types";
import { api } from "./api";


export const likeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    like: builder.mutation<Like, { postId: string }>({
      query: (likeData) => ({
        url: '/likes',
        method: 'POST',
        body: likeData
      })
    }),
    unlike: builder.mutation<{ message: string }, { postId: string }>({
      query: ({ postId }) => ({
        url: `/likes/${postId}`,
        method: 'DELETE'
      })
    })
  })
})

export const { useLikeMutation, useUnlikeMutation } = likeApi