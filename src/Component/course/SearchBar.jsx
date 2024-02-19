import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="flex items-center justify-center p-8 shadow-2xl rounded-md">
      <div className="flex rounded flex-1">
        <input
          type="text"
          className="px-4 py-2 w-full bg-gray-100 border-none outline-none"
          placeholder="Search keyword..."
        />

        <button className="flex items-center justify-center px-4 bg-primary">
          <FaSearch className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
