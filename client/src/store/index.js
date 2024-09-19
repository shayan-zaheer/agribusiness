import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        bar: barSlice.reducer
    }
});

export default store;