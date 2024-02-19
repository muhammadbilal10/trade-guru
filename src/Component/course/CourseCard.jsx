// src/components/CourseCard.js
import React from "react";

const CourseCard = ({ title, description, pictureUrl }) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-md overflow-hidden shadow-md my-4">
      <img
        src={pictureUrl}
        alt="Course"
        className="w-full h-32 object-cover p-2"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default CourseCard;
