// CourseRegistration.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../navbar/navbar";
const CourseRegistration = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [studentName, setStudentName] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');

  useEffect(() => {
    // Fetch the list of available courses from your backend
    const fetchCourses = async () => {
      try {
        const response = await axios.get('YOUR_BACKEND_COURSES_ENDPOINT');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleNameChange = (e) => {
    setStudentName(e.target.value);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      // Make an API request to register the student for the selected course
      const response = await axios.post('YOUR_BACKEND_REGISTRATION_ENDPOINT', {
        course: selectedCourse,
        studentName: studentName,
      });

      setRegistrationStatus(`Successfully registered for ${response.data.course}`);
    } catch (error) {
      console.error('Error registering for the course:', error);
      setRegistrationStatus('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <Navbar/>
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Course Registration</h2>
      <form onSubmit={handleRegistration}>
        <div className="mb-4">
          <label htmlFor="course" className="block text-sm font-medium text-gray-600">
            Select Course
          </label>
          <select
            id="course"
            name="course"
            value={selectedCourse}
            onChange={handleCourseChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          >
            <option value="" disabled>
              Select a course
            </option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"s
            value={studentName}
            onChange={handleNameChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Register
        </button>
      </form>
      {registrationStatus && <p className="mt-4">{registrationStatus}</p>}
    </div>
    </>
  );
};

export default CourseRegistration;
