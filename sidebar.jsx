import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-[#6C926C] text-white flex flex-col p-0 pt-10 ">
      <button className="bg-white text-green-800 px-4 py-2 mb-4 font-bold">ADD PRODUCT</button>
      <button className="bg-white text-green-800 px-4 py-2 font-bold">VIEW ORDERS</button>
    </div>
  );
};

export default Sidebar;
