import { configureStore } from "@reduxjs/toolkit";
import barSlice from "./barSlice";

const store = configureStore({
    reducer: {
        bar: barSlice.reducer
    }
});

export default store;