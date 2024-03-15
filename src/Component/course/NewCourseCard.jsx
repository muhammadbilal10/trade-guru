import React from "react";
import OOP from "/assets/OOP.png";
import { FaBook, FaClock, FaEllipsisV, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
const NewCourseCard = ({
  id,
  title,
  imageUrl,
  professor,
  enrollment,
  description,
  price,
  category,
  rating,
  courseId,
  sections,
  isInstructor,
  handleDelete,
  handleEdit,
}) => {
  const totalLectures = sections?.reduce(
    (acc, section) => acc + section.lectures.length,
    0
  );
  const [showMenu, setShowMenu] = React.useState(false);
  const navigate = useNavigate();
  const toggleMenu = (event) => {
    event.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <Link to={isInstructor ? "#" : `/course/course-details/${courseId}`}>
      <div className=" bg-white rounded-[8px] transition duration-100 hover:shadow-sm shadow-xl">
        <div className="h-[248px] rounded-t-[8px]  relative">
          <img
            src={imageUrl}
            alt=""
            class=" w-full h-full object-cover rounded-t-[8px]"
          />
          <span className="bg-secondary py-1 px-3 text-lg font-semibold rounded text-white absolute left-6 top-6">
            {/* {title} */}
            {category}
          </span>
        </div>
        <div className="course-content p-8">
          <div className="text-secondary text-start font-bold text-2xl mb-3">
            ${price}
          </div>
          <h4 className=" text-xl text-start mb-3 font-bold line-clamp-2 min-h-[3em]">
            {title}
          </h4>
          <div className="flex justify-between  flex-wrap space-y-1 xl:space-y-0">
            <span className=" flex items-center space-x-2 mr-3">
              <FaBook className="inline mr-2 text-primary" />
              <span className="font-bold text-gray-500">
                {totalLectures} Lessons
              </span>
            </span>
            <span className=" flex items-center space-x-2 mr-3">
              <FaClock className="inline text-primary" />
              <span className="font-bold text-gray-500">4h 30m</span>
            </span>
            <span className=" flex items-center space-x-2 ">
              <FaStar className="inline text-primary" />
              <span className="font-bold text-gray-500">{rating}</span>
            </span>
          </div>
        </div>
        {isInstructor && (
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="bg-primary hover:bg-primary-600 text-white w-full py-2 rounded-b-[8px]"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-primary hover:bg-primary-600 text-white w-full py-2 rounded-b-[8px]"
            >
              Remove
            </button>
            <button
              className="bg-primary hover:bg-primary-600 text-white w-full py-2 rounded-b-[8px]"
              onClick={() => navigate(`/feedback/${courseId}`)}
            >
              Feedback
            </button>
          </div>
        )}
      </div>
    </Link>
  );
};

export default NewCourseCard;

///////////////
