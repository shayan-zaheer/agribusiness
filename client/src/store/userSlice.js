import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        userProfile: (state, action) => {
            return action.payload;
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice;