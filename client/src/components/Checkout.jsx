function Checkout() {
    return (
        <div>
            <div className="flex bg-[rgb(167,217,167)] rounded-lg shadow-md p-4 m-5 hover:shadow-lg transition-shadow duration-200">
                <div className="flex-1">
                    <h1 className="text-xl font-bold mb-2">
                        {" "}
                        Farmer Name : Example
                    </h1>
                    <h2 className="text-xl font-bold mb-2">
                        {" "}
                        Product Name : example
                    </h2>
                    <p className="text-gray-800 mb-1">
                        <strong> Description :</strong> demo
                    </p>
                    <p className="text-gray-800 mb-1">
                        <strong> Price :</strong> demo
                    </p>
                    <p className="text-gray-800 mb-1">
                        <strong> Quantity Available :</strong> demo
                    </p>
                    <p className="text-gray-800 mb-1">
                        <strong>Category :</strong> demo
                    </p>
                    <p className="text-gray-800 mb-1">
                        <strong>Enter Your Desired Quantity :</strong>{" "}
                        <input
                            className="rounded-sm"
                            type="text"
                            name="buyerquantity"
                            id="buyerquantity"
                        />
                    </p>
                </div>
                <div className="flex flex-col items-end">
                    <img
                        className="w-32 h-32 mb-2 object-cover rounded-md shadow-sm"
                        src="src\assets\7358653-removebg-preview.png"
                        alt="imageproduct"
                    />
                    <div className="flex gap-2 ">
                        <button className="bg-green-600 text-white py-1 px-2 rounded-md hover:bg-green-700 transition-colors duration-200">
                            <strong> Contact Seller </strong>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-5 transform transition-transform duration-200 hover:scale-105">
                {" "}
                <button className="bg-green-500 text-black font-bold border-2 p-3 rounded-md m-auto">
                    Proceed to CheckOut
                </button>
            </div>
        </div>
    );
}

export default Checkout;
