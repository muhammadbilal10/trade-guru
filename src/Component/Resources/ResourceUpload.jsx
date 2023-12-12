import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../Dashboard/instructor/Toast";

const FileUpload = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const showToast = () => {
    setMessage("File Uploaded Successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleFileChange = (event) => {
    console.log(event.target.files);
    showToast();
    setTimeout(() => {
      navigate("/course/offer");
    }, 2000);
  };

  const handleClick = () => {};

  return (
    <div className=" w-full h-full flex">
      <div className="extraOutline p-4  w-max bg-white m-auto rounded-lg">
        <div
          className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
          style={{ width: "450px" }}
        >
          <svg
            className="text-blue-500 w-24 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <div className="input_field flex flex-col w-max mx-auto text-center">
            <label>
              <input
                className="text-sm cursor-pointer w-36 hidden"
                type="file"
                multiple
                onChange={handleFileChange}
              />
              <div
                className="text bg-blue-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-blue-600"
                onClick={handleClick}
              >
                Select
              </div>
            </label>

            <div className="title text-blue-500 uppercase">
              or drop files here
            </div>
          </div>
        </div>
      </div>
      <Toast message={message} type="info" />
    </div>
  );
};

export default FileUpload;
