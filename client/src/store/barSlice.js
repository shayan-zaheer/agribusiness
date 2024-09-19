import { createSlice } from "@reduxjs/toolkit";

const barSlice = createSlice({
    name: "bar",
    initialState: true,
    reducers: {
        toggle: (state, action) => {
            return !state;  
        }
    }
});

export const barActions = barSlice.actions;
export default barSlice;