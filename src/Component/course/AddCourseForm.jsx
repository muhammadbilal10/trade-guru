import React, { useState } from "react";

const AddCourseForm = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    courseCode: "",
    courseDetails: "",
    startDate: "",
    maxStudents: "",
    courseDuration: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData));
    console.log("Form submitted:", formData);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-full mx-12 bg-white p-8 border rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Course Registration</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="courseName"
              className="block text-sm font-medium text-gray-600"
            >
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
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
          </div>

          <div className="mb-4">
            <label
              htmlFor="courseDetails"
              className="block text-sm font-medium text-gray-600"
            >
              Course Details
            </label>
            <textarea
              id="courseDetails"
              name="courseDetails"
              value={formData.courseDetails}
              onChange={handleChange}
              rows="4"
              className="mt-1 p-2 w-full border rounded-md"
            ></textarea>
          </div>

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
              htmlFor="maxStudents"
              className="block text-sm font-medium text-gray-600"
            >
              Max Students
            </label>
            <input
              type="number"
              id="maxStudents"
              name="maxStudents"
              value={formData.maxStudents}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
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
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              className="w-1/5 bg-blue-500 text-white p-3 rounded-md focus:outline-none focus:shadow-outline-blue hover:bg-blue-600"
            >
              Register Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseForm;
