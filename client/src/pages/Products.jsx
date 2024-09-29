import { useState, useEffect } from "react";
import ProductItem from "../components/ProductItem";
import SearchBar from "../components/SearchBar";
import axios from "axios";

function Products() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/users/userdata`,
                    { withCredentials: true }
                );
				const id = res.data.user._id;

				const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`);

				console.log(response);

				setProducts(response.data.data.products);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	console.log(products);

	return (
		<div>
			<SearchBar />
			{products ? ( products.map((product) => (
				<ProductItem key={product._id} product={product} />
			))) : <p>Empty</p>}
		</div>
	);
}

export default Products;
