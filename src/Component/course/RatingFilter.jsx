import React, { useState } from "react";

const ratings = [5, 4, 3, 2, 1];

const RatingFilter = () => {
  const [selectedRatings, setSelectedRatings] = useState({});

  const toggleRating = (rating) => {
    setSelectedRatings((prevRatings) => ({
      ...prevRatings,
      [rating]: !prevRatings[rating],
    }));
  };

  return (
    <div className="max-w-full mx-auto my-10 bg-white p-5 rounded-lg shadow-md">
      <div className="text-xl font-bold mb-4">Rating By</div>
      {ratings.map((rating) => (
        <div key={rating} className="flex items-center mb-2">
          <input
            type="checkbox"
            id={`rating-${rating}`}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            checked={selectedRatings[rating] || false}
            onChange={() => toggleRating(rating)}
          />
          <label htmlFor={`rating-${rating}`} className="flex-grow ml-2">
            {[...Array(rating)].map((_, index) => (
              <span
                key={index}
                className="text-yellow-400 text-2xl font-bold ml-2"
              >
                &#9733;
              </span>
            ))}
            {[...Array(5 - rating)].map((_, index) => (
              <span
                key={index}
                className="text-gray-300 text-2xl font-bold ml-2"
              >
                &#9733;
              </span>
            ))}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RatingFilter;
