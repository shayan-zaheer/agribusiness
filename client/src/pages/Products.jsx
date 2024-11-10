import { useSelector } from "react-redux";
import ProductItem from "../components/ProductItem";
import SearchBar from "../components/SearchBar";
import FetchProducts from "../components/FetchProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import { useState, useEffect } from "react";

function Products() {
    const products = useSelector(store => store.product.products);
    const { role } = useSelector(store => store.user);

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setData(products);
        setFilteredData(products); // Initialize filteredData when products are fetched
    }, [products]);

    const handleSearch = (query) => {
        if (query) {
            const result = data.filter(item =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredData(result);
        } else {
            setFilteredData(data);
        }
    };

    return (
        <>
            {role === "seller" && (
                <h1 className="text-center font-bold text-white">Your Products</h1>
            )}

            {role === "buyer" && (
                <h1 className="text-center font-bold text-white">Search for Products</h1>
            )}

            <div>
                <SearchBar onSearch={handleSearch} />
                {filteredData.length > 0 ? (
                    filteredData.map((product) => (
                        <ProductItem key={product._id} product={product} />
                    ))
                ) : (
                    <LoadingSpinner />
                )}
            </div>

            <FetchProducts />
        </>
    );
}

export default Products;

