import React, { memo, useState } from "react";
import { useMemo } from "react";
import AddCourseForm from "../course/AddCourseForm";
import { FiChevronDown, FiChevronRight, FiBook, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [showCourseMenu, setShowCourseMenu] = useState(false);
  const navigate = useNavigate();

  const toggleCourseMenu = () => {
    setShowCourseMenu(!showCourseMenu);
  };

  console.log("render");
  return (
    <div className="bg-white text-white min-h-screen w-1/5 fixed overflow-x-hidden">
      <h1 className="p-4 text-3xl font-semibold mb-6  text-[#666666] flex gap-2 items-center">
        <FiUser className="text-[#6673fc]" />
        Instructor
      </h1>
      <div className={`p-4 ${showCourseMenu && "bg-[#f4f6f9]"} bg-[#f4f6f9]`}>
        <div className="">
          <button
            onClick={toggleCourseMenu}
            className="w-full py-2 px-4 text-left text-sm font-semibold text-blue-400 hover:text-blue-300 focus:outline-none"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-2">
                  {" "}
                  <FiBook />
                </div>
                Courses
              </div>
              {showCourseMenu ? <FiChevronDown /> : <FiChevronRight />}
            </div>
          </button>
          {showCourseMenu && (
            <ul className="mt-4 ">
              <li className="mb-2">
                <a
                  // href="/course/offer"
                  onClick={() => navigate("/course/offer")}
                  className="text-blue-300 hover:text-blue-500 text-sm cursor-pointer"
                >
                  Course Offer
                </a>
              </li>
              <li className="mb-2">
                <a
                  onClick={() => navigate("/course/add")}
                  className="text-blue-300 hover:text-blue-500 text-sm cursor-pointer"
                >
                  Add Course
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Sidebar);
