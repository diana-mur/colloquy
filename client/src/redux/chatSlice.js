import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { baseUrl } from "../utils/services.js"

export const chatThunk = createAsyncThunk(
    'chatThunk',
    async (chatId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/api/chats/findById/${chatId}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },

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
    chatId: localStorage.getItem("chatId"),
    error: undefined
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        reset: (state, action) => {
            state.loading = false
            state.chatId = undefined
            state.error = undefined

            // localStorage.removeItem("chatId")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(chatThunk.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(chatThunk.fulfilled, (state, action) => {
            const payload = action.payload
            console.log("payload", payload);

            state.chatId = payload.chat._id

            localStorage.setItem("chatId", payload.chat._id)

            state.error = undefined
            state.loading = false
        })
        builder.addCase(chatThunk.rejected, (state, action) => {
            const payload = action.payload

            state.error = payload.error
            state.loading = false
        })
    }
})