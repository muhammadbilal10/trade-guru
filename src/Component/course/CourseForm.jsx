// src/components/CourseForm.js
import React, { useState } from 'react';
import Navbar from "../navbar/navbar";
import CourseCard from "./CourseCard";
import FeatureBar from "./FeatureBar";
import CourseFormModal from "./CourseFormModal"; // Import the new CourseFormModal component

const CourseForm = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <Navbar>
        {/* Your existing Navbar content, if any */}
      </Navbar>
      <FeatureBar onAddCourseClick={toggleForm} />
      
      {showForm && (
        <CourseFormModal onClose={toggleForm} />
      )}
      
      <CourseCard
        title="Sample Course Title"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        pictureUrl="https://via.placeholder.com/150"
      />
    </>
  );
};

export default CourseForm;
