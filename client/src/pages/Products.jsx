import { useSelector } from "react-redux";
import ProductItem from "../components/ProductItem";
import SearchBar from "../components/SearchBar";
import FetchProducts from "../components/FetchProducts";
import LoadingSpinner from "../components/LoadingSpinner";

function Products() {
    const products = useSelector(store => store.product.products);
    const { role } = useSelector(store => store.user);

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
                {products && products.length > 0 ? (
                    products.map((product) => (
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
