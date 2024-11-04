import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        loading: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        }
    },
});

export const productActions = productSlice.actions;
export default productSlice;
