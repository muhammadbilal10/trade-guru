import React, { useState } from "react";

const PriceFilter = () => {
  const [price, setPrice] = useState(3000);

  return (
    <div className="p-8 bg-white rounded-lg shadow-2xl max-w-full mx-auto">
      <div className="text-lg font-bold mb-2">Price Filter</div>
      <input
        type="range"
        min="3000"
        max="6000"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{
          "--tw-range-thumb-background": { background: "bg-black" }, // Tailwind CSS JIT support for custom properties
        }}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer  dark:bg-gray-700"
      />
      <div className="flex justify-between text-sm font-medium mt-2">
        <span>Price: </span>
        <span>${price} - $6000</span>
      </div>
    </div>
  );
};

export default PriceFilter;
