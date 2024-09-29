import { configureStore } from "@reduxjs/toolkit";
import barSlice from "./barSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        bar: barSlice.reducer,
    }
});

export default store;