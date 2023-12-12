import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";

const OfferCourseCard = ({ title, imageUrl, professor, enrollment }) => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  return (
    <div className=" max-w-xs rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-56" src={imageUrl} alt="Course Image" />
      <div className="px-6 py-4">
        <div className="font-bold text-md mb-2 text-[#666666]">{title}</div>
        <p className="text-gray-700 text-base ">Taught by: {professor}</p>
      </div>
      <div className="px-6 pt-4 pb-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 ">
          students: {enrollment}
        </span>
      </div>

      <div className="flex justify-between items-center mx-2 mb-4">
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded-full `}
          onClick={() => {
            navigate("/course/uploadResources");
          }}
        >
          <div className="flex gap-2 items-center">
            <FiUpload size={18} /> <span>Resources</span>
          </div>
        </button>
        <button
          className={`${
            toggle
              ? "bg-gray-400 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }  font-bold py-1 px-4 rounded-full `}
          onClick={() => {
            if (!toggle) {
              setToggle(!toggle);
            }
          }}
        >
          {toggle ? "offered" : "offer"}
        </button>
      </div>
    </div>
  );
};

export default OfferCourseCard;
