import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {  // state = initialState, action.payload = from user
        setUserId: (state, action) => {
            state.userId = action.payload
        }
    }
})

export const { setUserId } = userSlice.actions;

export default userSlice.reducer;

