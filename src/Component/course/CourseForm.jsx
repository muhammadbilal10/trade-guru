// src/components/CourseForm.js
import React, { useState } from 'react';
import Navbar from "../navbar/navbar";

import { getAuth } from "firebase/auth";
import app from "../../database/firebase";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from 'firebase/firestore';

const CourseForm = () => {

  const auth = getAuth(app);
  const db = getFirestore(app);

  const [course, setCourse] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission logic here
    console.log('Course details submitted:', course);
    // Reset the form
    setCourse({
      title: '',
      description: '',
      instructor: '',
      duration: '',
    });

    addNewDocument(course)
  };
  const addNewDocument = async (data) => {
    try {
      const collectionRef = collection(db, "Course"); // Replace 'yourCollection' with the actual name of your collection
      await addDoc(collectionRef, data);

      console.log('Document added with custom ID: ', customDocId);
    } catch (error) {
      console.error('Error adding document with custom ID: ', error);
    }
  }



  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Offer a New Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-600">
              Course Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={course.title}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={course.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 p-2 w-full border rounded-md"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="instructor" className="block text-sm font-medium text-gray-600">
              Instructor
            </label>
            <input
              type="text"
              id="instructor"
              name="instructor"
              value={course.instructor}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="duration" className="block text-sm font-medium text-gray-600">
              Duration
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={course.duration}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Offer Course
          </button>
        </form>
      </div>
    </>
  );
};

export default CourseForm;
