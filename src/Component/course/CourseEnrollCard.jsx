import React from "react";
import {
  FaUser,
  FaClock,
  FaPlay,
  FaFile,
  FaStar,
  FaGlobe,
  FaAward,
} from "react-icons/fa";

const CourseEnrollCard = ({
  id,
  title,
  description,
  imageUrl,
  lecture,
  instructor,
  duration,
  level,
  language,
  enroll,
  price,
}) => {
  console.log(language);

  const EnrollCardDetails = [
    {
      id: 1,
      icon: FaUser,
      title: "Instructor",
      value: instructor,
    },
    {
      id: 2,
      icon: FaFile,
      title: "Lectures",
      value: lecture,
    },
    {
      id: 3,
      icon: FaClock,
      title: "Duration",
      value: duration,
    },
    {
      id: 4,
      icon: FaStar,
      title: "Enrolled",
      value: `${enroll} Students`,
    },

    {
      id: 5,
      icon: FaAward,
      title: "Course Level",
      value: level,
    },
    {
      id: 6,
      icon: FaGlobe,
      title: "Language",
      value: language,
    },
  ];

  return (
    <div className="max-w-full rounded overflow-hidden shadow-lg bg-white p-4">
      <div className="relative">
        <img
          className="w-full rounded-md h-[220px] object-cover"
          src={imageUrl}
          alt="Course"
        />
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white rounded-full p-4">
          <FaPlay className="h-8 w-8" />
        </button>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-2xl mb-4">{price}</div>
        <button className="bg-primary  hover:outline text-white font-bold py-2 px-4 rounded w-full">
          Enroll Now
        </button>
      </div>
      <div className="px-6 py-4">
        {EnrollCardDetails.map((item, index) => (
          <div>
            <div className="flex items-center" key={item.id}>
              {React.createElement(item.icon, {
                className: "text-secondary mr-2",
              })}
              <span className="text-gray-700 font-medium text-lg">
                {item.title}
              </span>
              <span className="ml-auto font-bold text-gray-500">
                {item.value}
              </span>
            </div>
            {index != EnrollCardDetails.length - 1 && (
              <div class="divider my-4">
                <hr class="border-t border-gray-300" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseEnrollCard;
