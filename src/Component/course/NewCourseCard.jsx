import React from "react";
import OOP from "/assets/OOP.png";
import { FaBook, FaClock, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
const NewCourseCard = ({
  id,
  title,
  imageUrl,
  professor,
  enrollment,
  description,
  price,
}) => {
  return (
    <Link to={`/course/course-details/${id}`}>
      <div className=" bg-white rounded-[8px] transition duration-100 hover:shadow-sm shadow-xl">
        <div className="h-[248px] rounded-t-[8px]  relative">
          <img
            src={imageUrl}
            alt=""
            class=" w-full h-full object-cover rounded-t-[8px]"
          />
          <span className="bg-secondary py-1 px-3 text-lg font-semibold rounded text-white absolute left-6 top-6">
            {title}
          </span>
        </div>
        <div className="course-content p-8">
          <div className="text-secondary font-bold text-2xl mb-3">{price}</div>
          <h4 className=" text-xl mb-3 font-bold">{description}</h4>
          <div className="flex justify-between  flex-wrap space-y-1 xl:space-y-0">
            <span className=" flex items-center space-x-2 mr-3">
              <FaBook className="inline mr-2 text-primary" />
              <span className="font-bold text-gray-500">2 Lessons</span>
            </span>
            <span className=" flex items-center space-x-2 mr-3">
              <FaClock className="inline text-primary" />
              <span className="font-bold text-gray-500">4h 30m</span>
            </span>
            <span className=" flex items-center space-x-2 ">
              <FaStar className="inline text-primary" />
              <span className="font-bold text-gray-500">4.8</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewCourseCard;

///////////////
