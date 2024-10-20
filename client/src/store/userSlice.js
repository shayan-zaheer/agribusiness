import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        userProfile: (state, action) => {
            return action.payload;
        },
        clearUser: (state, action) => {
            state.user = null;
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice;