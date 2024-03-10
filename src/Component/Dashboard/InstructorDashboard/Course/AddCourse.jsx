import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import CurriculumSection from "./CurriculumSection";
import { useNavigate } from "react-router";

const AddCourse = ({ formData, setFormData, nextStep }) => {
  console.log(formData);

  // const [formData, setFormData] = useState({
  //   courseType: "",
  //   courseName: "",
  //   courseLevel: "",
  //   courseCategory: "",
  //   courseLanguage: "",
  //   courseImage: "",
  //   courseCode: "",
  //   courseDetails: "",
  //   startDate: "",
  //   maxStudents: "",
  //   courseDuration: "",
  // });

  const courseCategory = [
    "Programming",
    "Design",
    "Business",
    "Marketing",
    "Photography",
    "Music",
    "Health",
  ];

  const courseLevel = ["Beginner", "Intermediate", "Advanced"];
  const courseLanguage = ["English", "French", "Spanish", "German"];

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-full h-40">
        <form onSubmit={handleSubmit}>
          <div className="bg-white shadow-lg rounded-md p-8">
            <h2 className="text-2xl font-semibold mb-6">Course landing page</h2>
            <div class="border-t border-gray-300 my-4"></div>
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-600"
              >
                What type of course are you making?
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option value="">Select a course type</option>
                <option value="online">Online</option>
                <option value="offline">Course</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="courseName"
                className="block text-sm font-medium text-gray-600"
              >
                Course Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                placeholder="e.g. Introduction to Computer Science"
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="courseName"
                className="block text-sm font-medium text-gray-600"
              >
                What category best fits the knowledge you'll share?
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option value="">Select a course Category</option>
                {courseCategory.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className="mb-4">
            <label
              htmlFor="courseCode"
              className="block text-sm font-medium text-gray-600"
            >
              Course Code
            </label>
            <input
              type="text"
              id="courseCode"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div> */}

            <div className="mb-4">
              <label
                htmlFor="courseName"
                className="block text-sm font-medium text-gray-600"
              >
                Course Level
              </label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option value="">Select a course Level</option>
                {courseLevel.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="courseName"
                className="block text-sm font-medium text-gray-600"
              >
                Course Language
              </label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option value="">Select a course Language</option>
                {courseLanguage.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="courseDetails"
                className="block text-sm font-medium text-gray-600"
              >
                Course Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="mt-1 p-2 w-full border rounded-md"
              ></textarea>
            </div>

            {/* <div className="mb-4">
              <label
                htmlFor="courseImage"
                className="block text-sm font-medium text-gray-600"
              >
                Course Image
              </label>
              <input
                type="file"
                id="courseImage"
                name="courseImage"
                onChange={handleChange}
                accept="image/svg+xml, image/png, image/jpeg, image/gif"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div> */}

            {/* <ImageUpload /> */}

            <div className="mb-4">
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-600"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-600"
              >
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            {/* <div className="mb-4">
              <label
                htmlFor="courseDuration"
                className="block text-sm font-medium text-gray-600"
              >
                Course Duration (Months)
              </label>
              <input
                type="number"
                id="courseDuration"
                name="courseDuration"
                value={formData.courseDuration}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div> */}
            <div className="mt-6 text-end">
              <button
                type="submit"
                className=" bg-primary w-24 hover:bg-primary-600 text-white p-3 rounded-md focus:outline-none focus:shadow-outline-blue "
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
