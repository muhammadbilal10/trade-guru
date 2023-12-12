// src/components/FeatureBar.js
import React from 'react';

const FeatureBar = ({ onAddCourseClick }) => {
  return (
    <div className="flex justify-end p-4 bg-gray-200">
      <button
        onClick={onAddCourseClick}
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Add Course
      </button>
    </div>
  );
};

export default FeatureBar;
