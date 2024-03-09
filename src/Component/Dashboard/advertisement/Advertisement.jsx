import { React, useState } from "react";
import Sidenav from "../navbar/sidenav";
import Topnav from "../navbar/topnavbar";
import Card from '../card';

import { MdPendingActions } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import AddModal from "./Modals/AddModal";
export default function Advertisement() {

  const [IsOpen, setIsOpen] = useState(false)
  // Function to handle delete button click

  //   const [currentStep, setCurrentStep] = useState(1);
  //   const [sections, setSections] = useState([]);
  //   const [formData, setFormData] = useState({
  //     courseType: "",
  //     courseName: "",
  //     courseLevel: "",
  //     courseCategory: "",
  //     courseLanguage: "",
  //     courseImage: "",
  //     courseCode: "",
  //     courseDetails: "",
  //     startDate: "",
  //     maxStudents: "",
  //     courseDuration: "",
  //   });

  //   const nextStep = () => {
  //     setCurrentStep(currentStep + 1);
  //   };

  //   const prevStep = () => {
  //     setCurrentStep(currentStep - 1);
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();

  //     console.log(formData);
  //   };

  //   const formSteps = [
  //     <AddCourse
  //       formData={formData}
  //       setFormData={setFormData}
  //       nextStep={() => setCurrentStep((s) => s + 1)}
  //     />,
  //     <CurriculumSection
  //       sections={sections}
  //       setSections={setSections}
  //       nextStep={() => setCurrentStep((s) => s + 1)}
  //       prevStep={() => setCurrentStep((s) => s - 1)}
  //     />,
  //   ];





  const handleAddPlan = () => {
    setIsOpen(true);
  };

  const handleEditPlan = () => {
    // Logic for handling the "Edit Plan" button click
    console.log("Edit Plan clicked");
  };

  const handleDeletePlan = () => {
    // Logic for handling the "Delete Plan" button click
    console.log("Delete Plan clicked");
  };

  return (
    <>
      <div class="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden': isSideMenuOpen ">
        <Sidenav />
        <div class="flex flex-col flex-1 w-full">
          <Topnav />
          <main class="h-full overflow-y-auto">
            <div class="container px-6 mx-auto grid">
              <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Advertisment plan
              </h2>
              {/* <!-- CTA --> */}
              {/* <a
                class="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple"
                href=""
              >
                <div class="flex items-center">
                  <svg
                    class="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    ></path>
                  </svg>
                  <span>instructor approvals here</span>
                </div>

              </a> */}
              <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <Card title={"Total Advertisment plan"} count={5} Icon={<FaChalkboardTeacher />} color={'green-500'} />
                <Card title={"Total ads runing"} count={5} Icon={<MdPendingActions />} />
                <Card title={"Total requests"} count={6} Icon={<FaEdit />} />
              </div>



              <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <button
                  className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handleAddPlan}
                >
                  Add Plan
                </button>
                <button
                  className="p-4 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  onClick={handleEditPlan}
                >
                  Edit Plan
                </button>
                <button
                  className="p-4 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={handleDeletePlan}
                >
                  Delete Plan
                </button>
              </div>


            </div>
          </main>
        </div>
      </div>

      {
        IsOpen &&
        <AddModal isOpen={IsOpen} setIsOpen={setIsOpen} />
      }
    </>
  );
}



{/* <main className="h-full overflow-y-auto px-5 max-w-7xl mx-12">
            {formSteps[currentStep - 1]}
          </main> */}