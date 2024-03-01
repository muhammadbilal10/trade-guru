import React, { useState } from "react";
import NotificationCard from "./NotificationCard";

const TabButton = ({ active, onClick, children }) => (
  <button
    className={`px-4 py-2 text-md font-medium rounded-t-lg border-b-2 ${
      active
        ? "text-primary border-primary"
        : "text-gray-600 border-transparent"
    } focus:outline-none`}
    onClick={onClick}
  >
    {children}
  </button>
);

const MyCourses = () => {
  const [activeTab, setActiveTab] = useState("courses");
  const [courses, setCourses] = useState([]);
  const [lists, setLists] = useState([]);
  const [archieved, setArchieved] = useState([]);

  return (
    <div className="max-w-3xl lg:max-w-6xl  mx-auto px-10 -mt-4">
      <div className="flex flex-col sm:flex-row sm:space-x-10 bg-gray-100 p-1 max-w-lg">
        <TabButton
          active={activeTab === "courses"}
          onClick={() => setActiveTab("courses")}
        >
          All Courses
        </TabButton>
        <TabButton
          active={activeTab === "lists"}
          onClick={() => setActiveTab("lists")}
        >
          MyLists
        </TabButton>
        <TabButton
          active={activeTab === "archieved"}
          onClick={() => setActiveTab("archieved")}
        >
          Archieved
        </TabButton>
      </div>

      <div className="mt-10 ">
        {activeTab === "courses" && (
          <div>
            {courses.length === 0 && (
              <div>
                <NotificationCard />
                <div className="bg-white p-6 text-center">
                  <h2 className="text-xl font-bold mb-2">
                    Start learning from over 210,000 courses today.
                  </h2>
                  <p className="text-md">
                    When you purchase a course, it will appear here.
                    <a href="/browse" className="text-secondary underline pl-1">
                      Browse now.
                    </a>
                  </p>
                </div>
              </div>
            )}
            {courses.length > 0 && <div>My courses</div>}
          </div>
        )}

        {activeTab === "lists" && (
          <div className="">
            {lists.length === 0 && (
              <div className="bg-white p-6 text-center">
                <h2 className="text-xl font-bold mb-2">
                  Organize and access your courses faster!
                </h2>
                <p className="text-md">
                  <a href="/browse" className="text-secondary underline pr-1">
                    Go to the All Courses tab
                  </a>
                  to create a list.
                </p>
              </div>
            )}
            {lists.length > 0 && <div>My Lists</div>}
          </div>
        )}
        {activeTab === "archieved" && (
          <div className="">
            <div className="">
              {archieved.length === 0 && (
                <div className="bg-white p-6 text-center">
                  <h2 className="text-xl font-bold mb-2">
                    Focus on only the courses that matter to you.
                  </h2>
                  <p className="text-md">
                    <a href="/browse" className="text-secondary underline pr-1">
                      Go to the All Courses
                    </a>
                    tab to archive.
                  </p>
                </div>
              )}
              {archieved.length > 0 && <div>My Lists</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
