import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const authThunk = createAsyncThunk(
    'authThunk',
    async (data, { rejectWithValue }) => {
        try {

            const response = await fetch('http://localhost:5000/api/users/auth', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })

            const json = await response.json()

            if (response.status === 400) {
                return rejectWithValue(json)
            }

            return json

        } catch (error) {
            console.log(error);
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    loading: false,
    _id: localStorage.getItem("_id"),
    nickname: localStorage.getItem("nickname"),
    token: localStorage.getItem("token"),
    error: undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.error = undefined
            state.loading = false
            state._id = undefined
            state.nickname = undefined
            state.token = undefined

            localStorage.removeItem("_id")
            localStorage.removeItem("nickname")
            localStorage.removeItem("token")
        }
    },
    extraReducers: (builder) => {
        // pending = в ожидании
        builder.addCase(authThunk.pending, (state, action) => {
            state.loading = true
        })
        // fulfilled = выполнено
        builder.addCase(authThunk.fulfilled, (state, action) => {
            const payload = action.payload
            console.log(action);

            state._id = payload._id
            state.nickname = payload.nickname
            state.token = payload.token

            localStorage.setItem("_id", payload._id)
            localStorage.setItem("nickname", payload.nickname)
            localStorage.setItem("token", payload.token)

            state.error = undefined
            state.loading = false
        })
        // rejected = отклонено
        builder.addCase(authThunk.rejected, (state, action) => {
            const payload = action.payload

            state.error = payload.message
            state.loading = false
        })
    }
})

export const { logOut } = authSlice.actions
export default authSlice.reducer