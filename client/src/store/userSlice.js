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
        },
        setOnlineUser: (state, action) => {
            state.onlineUser = action.payload;
        },
        setSocketConnection: (state, action) => {
            state.socketConnection = action.payload;
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice;