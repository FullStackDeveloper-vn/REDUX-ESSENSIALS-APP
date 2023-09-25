import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const usersAdapter = createEntityAdapter()
const initialState = usersAdapter.getInitialState()

// const initialState = [
//     // { id: '0', name: 'Tianna Jenkins' },
//     // { id: '1', name: 'Kevin Grant' },
//     // { id: '2', name: 'Madison Price' },
//     // { id: '3', name: 'HOANG' }
// ]

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await client.get('/fakeApi/users')
    return response.data
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        // builder.addCase(fetchUsers.fulfilled, (state, action) => {
        //     return action.payload
        // })
        builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
    }
})

export default usersSlice.reducer
export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors(state=> state.users)

// export const selectAllUsers = state => state.users
// export const selectUserById = (state, userId) =>
// state.users.find(user => user.id === userId)