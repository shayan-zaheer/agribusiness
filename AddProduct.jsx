import React from "react";

const AddProduct = () => {
  return (
    <div className="flex-1 bg-gray-100 p-3">
      <header className="mb-10">
        <h1 className="text-5xl font-bold text-green-700 text-center pt-0 mt-0">AGRIBUSINESS</h1>
      </header>

      <form className="bg-gray-200 p-8 rounded-lg shadow-md max-w-4xl mx-auto">
        <div className="grid grid-cols-2 gap-6">

        
          <div className="col-span-2">
            <label className="block text-gray-700 text-lg font-semibold mb-2">
              PRODUCT NAME:
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter product name"
            />
          </div>

      
          <div className="col-span-2">
            <label className="block text-gray-700 text-lg font-semibold mb-2">
              VARIETY:
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter variety"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 text-lg font-semibold mb-2">
              DESCRIPTION:
            </label>
            <textarea
              className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter product description"
            />
          </div>

        
          <div>
            <label className="block text-gray-700 text-lg font-semibold mb-2">
              AVAILABLE QUANTITY:
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter available quantity"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-lg font-semibold mb-2">
              PRICE PER UNIT:
            </label>
            <input
              type="text"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter price per unit"
            />
          </div>

          
          <div className="col-span-2 relative">
            <label className="block text-gray-700 text-lg font-semibold mb-2">
              IMAGES OF PRODUCT:
            </label>
            <div className="border-dashed border-2 border-gray-300 rounded-md h-48 flex justify-center items-center relative">
              <input
                type="file"
                className="opacity-0 absolute h-full w-full cursor-pointer z-10"
              />
              <div className="text-gray-400">Click to upload product image</div>
            </div>
          </div>

        
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
              ADD PRODUCT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
