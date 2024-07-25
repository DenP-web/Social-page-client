import { Follow } from "../types";
import { api } from "./api";


export const followApi = api.injectEndpoints({
  endpoints: (builder) => ({
    follow: builder.mutation<Follow, { followingId: string }>({
      query: ({ followingId }) => ({
        url: '/follows',
        method: 'POST',
        body: followingId
      })
    }),
    unfollow: builder.mutation<{ message: string }, { followingId: string }>({
      query: ({ followingId }) => ({
        url: `/follows/${followingId}`,
        method: 'DELETE',
      })
    })
  })
})


export const { useFollowMutation, useUnfollowMutation } = followApi
export const { endpoints: { follow, unfollow } } = followApi