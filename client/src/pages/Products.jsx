// import { useState, useEffect } from "react";
// import ProductItem from "../components/ProductItem";
// import SearchBar from "../components/SearchBar";
// import axios from "axios";

// function Products() {
// 	const [products, setProducts] = useState([]);
// 	const [role, setRole] = useState("");
// 	const [userId, setUserId] = useState("");
// 	const [loading, setLoading] = useState(true);

// 	useEffect(() => {
// 		const fetchUserData = async () => {
// 			try {
// 				const res = await axios.get(
// 					`${import.meta.env.VITE_BACKEND_URL}/users/userdata`,
// 					{ withCredentials: true }
// 				);
// 				setRole(res?.data?.user?.role);
// 				setUserId(res?.data?.user?._id);
// 			} catch (error) {
// 				console.error("Error fetching user data:", error);
// 			}
// 		};

// 		fetchUserData();
// 	}, []);

// 	useEffect(() => {
// 		const fetchProducts = async () => {
// 			if (!role) return;

// 			setLoading(true);
// 			try {
// 				let response;
// 				if (role === "seller") {
// 					response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${userId}`, { withCredentials: true });
// 				} else if (role === "buyer") {
// 					response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`, { withCredentials: true });
// 				}

// 				setProducts(response?.data?.data?.products || []);
// 			} catch (error) {
// 				console.error("Error fetching products:", error);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		fetchProducts();
// 	}, [role, userId]);

// 	if (loading) {
// 		return <p>Loading products...</p>;
// 	}

// 	return (
// 		<div>
// 			<SearchBar />
// 			{products.length > 0 ? (
// 				products.map((product) => (
// 					<ProductItem key={product._id} product={product} />
// 				))
// 			) : (
// 				<p>No products available.</p>
// 			)}
// 		</div>
// 	);
// }

// export default Products;

import { useState, useEffect } from "react";
import ProductItem from "../components/ProductItem";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import { useSelector } from "react-redux";

function Products() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const {_id: id, username, role} = useSelector(state => state.user);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!username) {
                setLoading(false);
                return;
            }

            setLoading(true);
            let response;
            try {
                if (role === "seller") {
                    response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`, { withCredentials: true });
                } else if (role === "buyer") {
                    response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/`, { withCredentials: true });
                }
                console.log("Response:", response?.data);
                setProducts(response?.data?.data?.products || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <p>Loading products...</p>;
    }

    return (
        <>
            {role === "seller" && (
                <h1 className="text-center font-bold text-white">Your Products</h1>
            )}

            {role === "buyer" && (
                <h1 className="text-center font-bold text-white">Search for Products</h1>
            )}

            <div>
                <SearchBar />
                {products.length > 0 ? ( 
                    products.map((product) => (
                        <ProductItem key={product._id} product={product} />
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </>
    );
}

export default Products;