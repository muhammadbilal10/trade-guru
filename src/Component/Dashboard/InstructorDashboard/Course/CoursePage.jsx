import { React, useState } from "react";
import Sidenav from "../../navbar/sidenav";
import Topnav from "../../navbar/topnavbar";
import AddCourse from "./AddCourse";
import CurriculumSection from "./CurriculumSection";

export default function CoursePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [sections, setSections] = useState([]);
  const [formData, setFormData] = useState({
    courseType: "",
    courseName: "",
    courseLevel: "",
    courseCategory: "",
    courseLanguage: "",
    courseImage: "",
    courseCode: "",
    courseDetails: "",
    startDate: "",
    maxStudents: "",
    courseDuration: "",
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

  const formSteps = [
    <AddCourse
      formData={formData}
      setFormData={setFormData}
      nextStep={() => setCurrentStep((s) => s + 1)}
    />,
    <CurriculumSection
      sections={sections}
      setSections={setSections}
      nextStep={() => setCurrentStep((s) => s + 1)}
      prevStep={() => setCurrentStep((s) => s - 1)}
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
