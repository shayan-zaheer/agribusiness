import React, { useState } from 'react';

const Order = () => {
  const [status, setStatus] = useState('PENDING');

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div className="bg-[rgb(167,217,167)] text-black p-4 rounded-md m-5">
    <p><strong>BUYER NAME:</strong> Example</p>
    <p><strong>LOCATION:</strong> Example</p>
      <p><strong>PRODUCT:</strong> Example</p>
      <p><strong>VARIETY:</strong> Example</p>
      <p><strong>QUANTITY:</strong> 100</p>
      <p><strong>ORDER DATE:</strong> 2024-09-19</p>
      <p><strong>STATUS:</strong> {status}</p>

      <label htmlFor="status-select" className="block mt-4">
        <strong>Change Status:</strong>
      </label>
      <select
        id="status-select"
        value={status}
        onChange={handleStatusChange}
        className="mt-2 p-2 rounded border border-gray-300"
      >
        <option value="PENDING">Pending</option>
        <option value="DISPATCHED">Dispatched</option>
        <option value="DELIVERED">Delivered</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
    </div>
  );
};

export default Order;
