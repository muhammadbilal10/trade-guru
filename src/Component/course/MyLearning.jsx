import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import app from "../../database/firebase";
import { useParams } from "react-router-dom";
import {
  FaArrowDown,
  FaChevronCircleUp,
  FaChevronDown,
  FaChevronUp,
  FaEllipsisV,
  FaShare,
  FaSortDown,
  FaSortUp,
  FaStar,
} from "react-icons/fa";

// const courseContent = [
//   {
//     id: 1,
//     title: "Introduction",
//     lessons: [
//       "Welcome!",
//       "What you'll learn in this course",
//       "The steps for creating a course on Udemy",
//       "Activity: Set up your draft course on Udemy",
//     ],
//   },
// ];

const MyLearning = () => {
  const params = useParams();
  const courseId = params?.id;
  const [activeSection, setActiveSection] = useState(null);
  const [courseContent, setCourseContent] = useState({});
  const [showMaterial, setShowMaterial] = useState("");

  useEffect(() => {
    async function getCourseContent() {
      console.log("courseId", courseId);
      const db = getFirestore(app);
      const docRef = await doc(db, "Course", courseId);
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data().sections);
          setCourseContent(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    }
    getCourseContent();
  }, []);

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  if (!courseContent || !courseContent?.sections)
    return (
      <div className="animate-pulse flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 bg-gray-300 flex justify-center items-center">
          <div className="h-full w-full object-cover bg-gray-400" />
        </div>

        <aside className="w-full md:w-1/3 bg-white">
          <div className="text-lg font-bold p-5 border-b border-gray-200 bg-gray-200" />
          <div className="space-y-4 p-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="border-b border-gray-200">
                <div className="h-8 bg-gray-200 rounded" />
                <div className="mt-2 space-y-3">
                  {Array.from({ length: 3 }).map((_, lessonIndex) => (
                    <div
                      key={lessonIndex}
                      className="h-4 bg-gray-200 rounded"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    );

  return (
    <div>
      <nav className="bg-black text-white flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center font-bold">
            <span className="text-xl">Trade</span>
            <span className="text-xl text-primary">Guru.pk</span>
          </a>
          <span className="hidden md:block">
            {courseContent?.formData?.title}
          </span>
        </div>
        <div className="flex items-center">
          <button className="flex items-center text-gray-300 hover:text-white mr-6">
            <FaStar className="mr-1" /> Leave a rating
          </button>
          <button className="flex items-center text-gray-300 hover:text-white mr-6">
            Your progress <FaChevronDown className="ml-1" />
          </button>
          <button className="flex items-center text-gray-300 hover:text-white mr-6">
            <FaShare className="mr-1" /> Share
          </button>
          <button className="text-gray-300 hover:text-white">
            <FaEllipsisV />
          </button>
        </div>
      </nav>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 bg-black flex justify-center items-center">
          <video
            className="h-full w-full object-cover"
            controls
            src={showMaterial}
          />
        </div>

        <aside className="w-full md:w-1/3 bg-white overflow-y-auto">
          <div className="text-lg font-bold p-5 border-b border-gray-200">
            Course content
          </div>
          {courseContent?.sections?.map((section) => (
            <div key={section.id} className="border-b border-gray-200">
              <button
                onClick={() => toggleSection(section.id)}
                className="text-left w-full p-5 hover:bg-gray-100 focus:outline-none"
              >
                <div className="flex justify-between gap-1  items-center">
                  <span className="font-medium line-clamp-1">
                    {section?.objective}
                  </span>
                  <span>
                    {activeSection === section.id ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </span>
                </div>
              </button>
              <div
                className={`p-5 bg-gray-50 ${
                  activeSection === section.id ? "block" : "hidden"
                }`}
              >
                {section?.lectures?.map((lesson, index) => (
                  <div
                    key={index}
                    className="py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-200"
                  >
                    <p
                      className="flex flex-col"
                      onClick={() => setShowMaterial(lesson?.material)}
                    >
                      {index + 1}. {lesson?.title}
                      <div className="line-clamp-1">{lesson?.material}</div>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
};

export default MyLearning;
