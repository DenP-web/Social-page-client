

import { TConversation, TMessage } from '../types'
import { api } from './api'

export const messagesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<TMessage[], { receiverId: string, message: string }>({
      query: ({ receiverId, message }) => ({
        url: `/messages/send/${receiverId}`,
        method: 'POST',
        body: { message }
      })
    }),
    getAllConversations: builder.query<TConversation[], void>({
      query: () => ({
        url: `/messages`,
        method: 'GET',
      })
    }),
    getAllMessages: builder.query<TMessage[], { conversationId: string }>({
      query: ({ conversationId }) => ({
        url: `/messages/${conversationId}`,
        method: 'GET',
      })
    }),

    leaveConversation: builder.mutation<{ message: string }, { id: string }>({
      query: ({ id }) => ({
        url: `/messages/remove/${id}`,
        method: 'PUT',
      })
    }),

    createConversation: builder.mutation<TConversation, { id: string }>({
      query: ({ id }) => ({
        url: `/messages/create/${id}`,
        method: 'POST',
      })
    })
  })
})

export const { useGetAllConversationsQuery, useGetAllMessagesQuery, useLazyGetAllConversationsQuery, useLazyGetAllMessagesQuery, useSendMessageMutation, useLeaveConversationMutation, useCreateConversationMutation, } = messagesApi
export const { endpoints: { getAllConversations, getAllMessages, sendMessage, leaveConversation } } = messagesApi
