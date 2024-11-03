import { useSelector } from "react-redux";
import ProductItem from "../components/ProductItem";
import SearchBar from "../components/SearchBar";
import FetchProducts from "../components/FetchProducts";
import LoadingSpinner from "../components/LoadingSpinner";

function Products() {
    const products = useSelector((store) => store.product.products);
    const { role } = useSelector((store) => store.user);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white p-6">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold">
                    {role === "seller" ? "Your Products" : "Discover Products"}
                </h1>
                <p className="text-gray-300 mt-2">
                    {role === "seller"
                        ? "Manage and track your listed products here."
                        : "Browse and explore products available for purchase."}
                </p>
            </header>

            <div className="max-w-4xl mx-auto">
                <SearchBar />
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {products.map((product) => (
                            <ProductItem key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <LoadingSpinner />
                        <p className="ml-4 text-gray-400">Loading products...</p>
                    </div>
                )}
            </div>

            <FetchProducts />
        </div>
    );
}

export default Products;
