import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { productActions } from "../store/productSlice";

function FetchProducts() {
    const dispatch = useDispatch();
    const { _id: id, role } = useSelector(store => store.user);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchProducts = async () => {
            try {
                let response;
                if (role === "seller") {
                    response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`, { signal, withCredentials: true });
                } else if (role === "buyer") {
                    response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/`, { signal, withCredentials: true });
                }
        
                dispatch(productActions.setProducts(response?.data?.data?.products || []));
            } catch (err) {
                console.error(err);
            }
        };
        

        fetchProducts();

        return () => {
            controller.abort();
        };
    }, [dispatch, id, role]);

    return null;
}

export default FetchProducts;