import { createSlice, nanoid, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { client } from "../../api/client";
import { act } from "react-dom/test-utils";

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})
const initialState = postsAdapter.getInitialState({
    status: 'idle',
    error: null
})

// const initialState = {
//     posts: [],
//     status: 'idle',
//     error: null
// }

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts')
    console.log(response.data);

    return response.data
})

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async initialPost => {
        const response = await client.post('/fakeApi/posts', initialPost)
        return response.data
    }
)

// const initialState = [
//     {
//         id: '1', title: 'First Post !', content: 'Hi', content: 'Hi!',
//         user: "1",
//         date: sub(new Date(), { minutes: 10 }).toISOString(),
//         reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
//     },
//     {
//         id: '2', title: 'Second Post !', content: 'Hi more text',
//         content: 'Hi!',
//         date: sub(new Date(), { minutes: 3 }).toISOString(),
//         reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
//     },

// ]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // postAdded(state, action) {
        //     state.push(action.payload) //mutate data
        // },

        postAdded: {
            reducer(state, action) {
                // state.push(action.payload)
                state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId,
                        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
                    }
                }
            }
        },
        postUpdated(state, action) {
            // state.push(action.payload) //mutate data
            const { id, title, content } = action.payload
            // const existingPost = state.find(post => post.id === id)
            // const existingPost = state.posts.find(post => post.id === id)
            const existingPost = state.entities[id]
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },

        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            // const existingPost = state.find(post => post.id === postId)
            // const existingPost = state.posts.find(post => post.id === postId)
            const existingPost = state.entities[postId]
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // state.posts = state.posts.concat(action.payload)
                postsAdapter.upsertMany(state, action.payload)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // builder.addCase(addNewPost.fulfilled, (state, action) => {
            //     state.posts.push(action.payload)
            // })
            .addCase(addNewPost.fulfilled, postsAdapter.addOne)
    }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
export default postsSlice.reducer

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.posts)

// export const selectAllPosts = state => state.posts.posts
// export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)

export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.user === userId)
)