import { React, useState } from "react";
import Sidenav from "../../navbar/sidenav";
import Topnav from "../../navbar/topnavbar";
import AddCourse from "./AddCourse";
import CurriculumSection from "./CurriculumSection";
////////////////////////////////////////////
import { setDoc, doc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import app from "../../../../database/firebase";
import { getFirestore, getDoc } from "firebase/firestore";
import Cookies from "universal-cookie";
import ImageUpload from "./ImageUpload";

export default function CoursePage() {
  const db = getFirestore(app);
  const cookies = new Cookies();
  const [image, setImage] = useState(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [sections, setSections] = useState([]);
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    level: "",
    category: "",
    language: "",
    imageUrl: "",
    description: "",
    startDate: "",
    enroll: "30",
    duration: "",
    price: "",
    rating: "4.8",
  });

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  const handleAddCourse = async () => {
    try {
      const instructorId = cookies.get("userId");
      // Generate a unique course ID
      const courseId = uuid();

      // Define the document reference with the course ID
      const courseDocRef = doc(db, "Course", courseId);

      // Define the data structure for the course document
      const courseData = {
        courseId: courseId, // Include the course ID
        formData: formData,
        sections: sections,
        // Add other fields as needed
        instructorId: instructorId, // Use the instructor ID associated with the course
      };

      // Set the course data in the course document
      await setDoc(courseDocRef, courseData);

      console.log("Course added with ID:", courseId);
    } catch (error) {
      console.error("Error adding course:", error.message);
    }
  };

  const formSteps = [
    <AddCourse
      formData={formData}
      setFormData={setFormData}
      nextStep={() => setCurrentStep((s) => s + 1)}
    />,
    <ImageUpload
      formData={formData}
      setFormData={setFormData}
      image={image}
      setImage={setImage}
      nextStep={() => setCurrentStep((s) => s + 1)}
      prevStep={() => setCurrentStep((s) => s - 1)}
    />,
    <CurriculumSection
      sections={sections}
      setSections={setSections}
      nextStep={() => setCurrentStep((s) => s + 1)}
      prevStep={() => setCurrentStep((s) => s - 1)}
      handleAddCourse={handleAddCourse}
    />,
  ];

  return (
    <>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <Sidenav />
        <div className="flex flex-col flex-1 w-full">
          <Topnav />
          <main className="h-full overflow-y-auto px-5 max-w-7xl mx-12">
            {formSteps[currentStep - 1]}
          </main>
        </div>
      </div>
    </>
  );
}