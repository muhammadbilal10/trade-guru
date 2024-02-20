import React, { useState } from "react";
import InstructorDetailsCard from "../instructor/InstructorDetailsCard";
import OverviewTab from "./OverviewTab";
import CurriculumTab from "./CurriculumTab";

const TabButton = ({ active, onClick, children }) => (
  <button
    className={`px-4 py-2 text-lg font-medium rounded-t-lg border-b-2 ${
      active
        ? "text-red-600 border-red-600"
        : "text-gray-600 border-transparent"
    } focus:outline-none`}
    onClick={onClick}
  >
    {children}
  </button>
);

const CourseTabs = ({ InstructorDetails }) => {
  const [activeTab, setActiveTab] = useState("overview");
  console.log(InstructorDetails);
  return (
    <div>
      <div className="flex space-x-1 bg-gray-100 p-1">
        <TabButton
          active={activeTab === "overview"}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </TabButton>
        <TabButton
          active={activeTab === "curriculum"}
          onClick={() => setActiveTab("curriculum")}
        >
          Curriculum
        </TabButton>
        <TabButton
          active={activeTab === "instructor"}
          onClick={() => setActiveTab("instructor")}
        >
          Instructor
        </TabButton>
        <TabButton
          active={activeTab === "reviews"}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </TabButton>
      </div>

      <div className="mt-10 rounded-xl shadow-xl">
        {activeTab === "overview" && (
          <div>
            <OverviewTab />
          </div>
        )}
        {activeTab === "curriculum" && (
          <div className="p-8">
            <CurriculumTab />
          </div>
        )}
        {activeTab === "instructor" && (
          <div className="bg-[#f8f8f8] p-8">
            <InstructorDetailsCard {...InstructorDetails} />
          </div>
        )}
        {activeTab === "reviews" && <div>Reviews Content</div>}
      </div>
    </div>
  );
};

export default CourseTabs;
