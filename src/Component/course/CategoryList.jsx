import React from "react";
import { FaChevronRight } from "react-icons/fa";

const CategoryList = () => {
  const categories = [
    { name: "Development", count: 23 },
    { name: "Art & Design", count: 45 },
    { name: "Data Science", count: 14 },
    // Duplicate 'Data Science' entry as per the image provided.
    // You would typically not have duplicates in real data.
    { name: "Data Science", count: 14 },
    { name: "Technology", count: 28 },
    { name: "IT Management", count: 34 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-2xl p-6 ">
      <h2 className="font-bold text-lg mb-4">Categories</h2>
      <div className="divide-y divide-gray-200">
        {categories.map((category, index) => (
          <div key={index} className="flex justify-between items-center py-3 ">
            <span className="text-gray-700 ">
              {category.name} ({category.count})
            </span>
            <FaChevronRight className="text-gray-400 " />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
