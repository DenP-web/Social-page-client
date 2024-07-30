import { Post } from "../types";
import { api } from "./api";


export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({

    createPost: builder.mutation<Post, { content: string }>({
      query: (postData) => ({
        url: '/posts',
        method: 'POST',
        body: postData
      }),
    }),

    getAllPosts: builder.query<{posts: Post[]}, void>({
      query: () => ({
        url: '/posts',
        method: 'GET'
      })
    }),

    getPostById: builder.query<{post: Post}, { id: string }>({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: 'GET'
      })
    }),

    deletePost: builder.mutation<{ message: string }, { id: string }>({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: 'DELETE'
      })
    })

  })
})

export const { useCreatePostMutation, useDeletePostMutation, useGetAllPostsQuery, useGetPostByIdQuery, useLazyGetAllPostsQuery, useLazyGetPostByIdQuery } = postApi
export const { endpoints: { createPost, deletePost, getAllPosts, getPostById } } = postApi