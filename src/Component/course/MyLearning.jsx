import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";

import app from "../../database/firebase";
import {
  FaChevronDown,
  FaChevronUp,
  FaEllipsisV,
  FaShare,
  FaStar,
} from "react-icons/fa";
import RatingModal from "../student/RatingModal";

const MyLearning = () => {
  const params = useParams();
  const courseId = params?.id;
  const [activeSection, setActiveSection] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [courseContent, setCourseContent] = useState({});
  const [showMaterial, setShowMaterial] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const getCourseContent = async () => {
      const db = getFirestore(app);
      const docRef = doc(db, "Course", courseId);
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const content = docSnap.data();
          setCourseContent(content);
          // Automatically set the first section as active if sections exist
          if (content.sections && content.sections.length > 0) {
            setActiveSection(content.sections[0].id);
            if (
              content.sections[0].lectures &&
              content.sections[0].lectures.length > 0
            ) {
              // Also show the first material of the first section if available
              setShowMaterial(content.sections[0].lectures[0].material);
              setActiveLesson(0);
            }
          }
          setCourseContent(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    getCourseContent();
  }, [courseId]);

  const getContentInfo = (url) => {
    const extensionMatch = url.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
    if (!extensionMatch) return { type: "unknown" };

    const extension = extensionMatch[1].toLowerCase();
    switch (extension) {
      case "mp4":
      case "webm":
      case "ogg":
        return { type: "video" };
      case "pdf":
        return { type: "pdf" };
      case "ppt":
      case "pptx":
        return { type: "powerpoint" };
      default:
        return { type: "unknown" };
    }
  };

  const handleLessonClick = (lesson, index) => {
    setShowMaterial(lesson.material);
    setActiveLesson(index);
  };

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  if (!courseContent || !courseContent.sections) {
    // Loading or no content state
    return <div>Loading...</div>;
  }

  if (
    !courseContent ||
    Object.keys(courseContent).length === 0 ||
    !courseContent.sections ||
    courseContent.sections.length === 0
  ) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <p className="text-lg font-semibold">No course content found.</p>
      </div>
    );
  }

  return modalOpen ? (
    <RatingModal
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      courseId={courseId}
    />
  ) : (
    <div className="flex-1">
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
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center text-gray-300 hover:text-white mr-6"
          >
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
        <div className="w-full md:w-2/3">
          {showMaterial ? (
            {
              video: (
                <video
                  className="h-full w-full object-cover"
                  controls
                  src={showMaterial}
                />
              ),
              pdf: (
                <embed
                  src={showMaterial}
                  type="application/pdf"
                  width="100%"
                  height="600px"
                />
              ),
              powerpoint: (
                <div className="flex justify-center items-center h-full bg-gray-100  rounded-lg shadow">
                  <div className="p-5 text-center ">
                    <h3 className="text-lg font-semibold">
                      PowerPoint Presentation
                    </h3>
                    <p className="my-2">
                      Click below to download the presentation.
                    </p>
                    <a
                      href={showMaterial}
                      download
                      className="inline-block px-6 py-2 bg-secondary text-white font-semibold rounded hover:bg-secondary-600 transition-colors"
                    >
                      Download
                    </a>
                  </div>
                </div>
              ),
              unknown: <div>Unsupported file type</div>,
            }[getContentInfo(showMaterial).type]
          ) : (
            <div className="flex justify-center items-center h-full">
              <p>No course material available.</p>
            </div>
          )}
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
                className={`p-5 bg-white-50 space-y-4  ${
                  activeSection === section.id ? "block" : "hidden"
                }`}
              >
                {section?.lectures?.map((lesson, index) => (
                  <div
                    key={index}
                    className={`p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-200 ${
                      activeLesson === index ? "bg-gray-300" : ""
                    }`}
                  >
                    <p
                      className="flex flex-col"
                      onClick={() => handleLessonClick(lesson, index)}
                    >
                      {index + 1}. {lesson?.title}
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
