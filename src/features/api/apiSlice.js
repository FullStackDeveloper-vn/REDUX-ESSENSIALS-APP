import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
    tagTypes: ['Post'],
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/posts',
            providesTags: ['Post']
        }),
        getPost: builder.query({
            query: postId => `/posts/${postId}`
        }),
        addNewPost: builder.mutation({
            query: initialPost => ({
                url: '/posts',
                method: "POST",
                // Include the entire post object as the body of the request
                body: initialPost
            }),
            invalidatesTags: ['Post']
        })
    })
})

export const { useGetPostsQuery, useGetPostQuery, useAddNewPostMutation } = apiSlice