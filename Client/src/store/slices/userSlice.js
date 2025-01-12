import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {  // state = initialState, action.payload = from user
        setUser: (state, action) => {
            state.userId = action.payload
        }
    }
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

