import React, { useState, useEffect } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  getFirestore,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import app from "../../database/firebase"; // Ensure this is the correct path to your Firebase config

const RatingModal = ({ modalOpen, setModalOpen, courseId }) => {
  // Initialize state variables without using reviewData
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");
  const [reviewData, setReviewData] = useState(null);

  useEffect(() => {
    if (!modalOpen) return; // Exit early if modal is not open

    const getReviewData = async () => {
      const db = getFirestore(app);
      const reviewRef = doc(
        db,
        "Course",
        courseId,
        "Reviews",
        "21oEyQqYJHeth0OVEl0DTxDBtd92"
      );

      try {
        const docSnap = await getDoc(reviewRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setRating(data.rating);
          setComment(data.comment);
          setReviewData({ id: docSnap.id, ...data });
        } else {
          // Handle the case where the document does not exist
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    getReviewData();
  }, [modalOpen, courseId]); // Add dependencies here for useEffect

  const submitRating = async () => {
    const db = getFirestore(app);
    const reviewRef = doc(
      db,
      "Course",
      courseId,
      "Reviews",
      "21oEyQqYJHeth0OVEl0DTxDBtd92"
    );
    const review = {
      reviewId: reviewData ? reviewData.id : uuid(),
      rating,
      comment,
      timestamp: new Date().toISOString().split("T")[0],
    };

    try {
      if (reviewData) {
        await updateDoc(reviewRef, review);
      } else {
        await setDoc(reviewRef, review);
      }
      console.log("Document successfully written!");
      setModalOpen(false);
    } catch (error) {
      console.error("Error writing document:", error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (!modalOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
      id="my-modal"
    >
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-1/3">
        <div className="flex justify-end p-2">
          <button
            onClick={closeModal}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 pt-0 text-center">
          <h3 className="text-xl leading-6 font-bold text-gray-900 mb-4">
            Why did you leave this rating?
          </h3>
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`h-8 w-8 cursor-pointer ${
                  i < rating ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRating(i + 1)}
              />
            ))}
          </div>
          <textarea
            className="w-full border rounded-lg p-2 text-gray-700 focus:outline-none"
            placeholder="Tell us about your own personal experience taking this course. Was it a good match for you?"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="mt-4">
            <button
              id="ok-btn"
              className="px-4 py-2 bg-primary text-white font-medium rounded-md w-full shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={submitRating}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
