import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";


   

function Payment() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

    const handleSelectPayment = (method) => {
        setSelectedPaymentMethod(method);
    };
  

    return (
    <div>
        <div className="flex bg-[rgb(167,217,167)] rounded-lg shadow-md p-4 m-5 hover:shadow-lg transition-shadow duration-200">
            <div className="flex-1">
                <h1 className="text-xl font-bold mb-2"> Farmer Name : Example</h1>
                <h2 className="text-xl font-bold mb-2" > Product Name : example</h2>
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
                    <strong>Enter Your Desired Quantity :</strong> <input className="rounded-sm" type="text" readOnly name="buyerquantity" id="buyerquantity" />
                </p>
                <br /><br />
                <p className="text-green-900 mb-1 font-extrabold">
                    <strong>Total Bill :</strong> <input className="rounded-sm" type="text" readOnly name="buyerquantity" id="buyerquantity" />
                </p>
            </div>
            <div className="flex flex-col items-end">
                <img className="w-32 h-32 mb-2 object-cover rounded-md shadow-sm" src="src\assets\7358653-removebg-preview.png" alt= "imageproduct" />
                <div className="flex gap-2 ">
                  
                    
                        <button  className="bg-green-600 text-white py-1 px-2 rounded-md hover:bg-green-700 transition-colors duration-200">
                            <strong> Contact Seller </strong>
                        </button>
                
                </div>
            </div>
           
        </div>
        <div className=" rounded-lg shadow-md p-4 m-5 hover:shadow-lg transition-shadow duration-200 bg-slate-200">
                <label htmlFor="" className="font-extrabold text-3xl "> Pay Via</label>
               
                <div className="flex gap-8 mt-9 ml-5">
                <img 
                    src="src/assets/Easypaisa-logo.png" 
                    alt="Easypaisa Logo" 
                    onClick={() => handleSelectPayment("easypaisa")}
                    className={`w-24 h-12 object-contain cursor-pointer transition-transform duration-200 hover:scale-110 ${selectedPaymentMethod === "easypaisa" ? "border-2 border-blue-500 rounded-lg" : ""}`}
                />
                <img 
                    src="src/assets/Jazzcash-logo.png" 
                    alt="Jazzcash Logo" 
                    onClick={() => handleSelectPayment("jazzcash")}
                    className={`w-24 h-12 object-contain cursor-pointer transition-transform duration-200 hover:scale-110 ${selectedPaymentMethod === "jazzcash" ? "border-2 border-blue-500 rounded-lg" : ""}`}
                />
                </div>
            </div>
    </div>
    );
}

export default Payment;
