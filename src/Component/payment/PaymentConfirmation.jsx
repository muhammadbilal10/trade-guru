import { arrayUnion, doc, getFirestore, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import app from "../../database/firebase";

const PaymentConfirmationPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const SetEnrolled = async () => {
      const db = getFirestore(app);
      const docRef = doc(db, "User", "21oEyQqYJHeth0OVEl0DTxDBtd92");
      try {
        await setDoc(
          docRef,
          { enrolledCourses: arrayUnion(params.id) },
          { merge: true }
        );
      } catch (error) {
        console.error("Error setting document:", error);
      }
    };
    SetEnrolled();
  }, []);

  const navigateToCourses = () => {
    navigate("/my-courses");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <FaCheckCircle className="h-20 w-20 text-secondary" />
          <h1 className="text-2xl font-semibold text-gray-800 mt-4">
            Payment Successful!
          </h1>
          <p className="text-md text-gray-600 text-center mt-2">
            Your enrollment has been confirmed. You can now access your course
            materials.
          </p>
          <button
            onClick={navigateToCourses}
            className="mt-6 px-6 py-3 bg-primary text-white rounded-md shadow hover:bg-primary-600 transition duration-200 ease-in-out"
          >
            Go to My Courses
          </button>
          <button
            onClick={() => navigate("/")}
            className="mt-2 px-6 py-3 bg-gray-300 text-gray-700 rounded-md shadow hover:bg-gray-400 transition duration-200 ease-in-out"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;
