import React, { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "../../database/firebase";
import NewCourseCard from "../course/NewCourseCard";
import MyLearning from "../course/MyLearning";
import Cookies from 'universal-cookie';
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
  const cookies = new Cookies();
  const [userId, setUserId] = useState(cookies.get('userId'));

  useEffect(() => {
    const fetchCourses = async () => {
      const db = getFirestore(app);
      const docRef = doc(db, "User", userId);
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data().enrolledCourses);
          const enrolledCoursesIds =
            docSnap.data().enrolledCourses.map((course) => course.courseId) ||
            [];
          console.log(enrolledCoursesIds);

          const batches = [];
          while (enrolledCoursesIds.length) {
            const batch = enrolledCoursesIds.splice(0, 10);
            batches.push(batch);
          }

          const coursesPromises = batches.map((batch) => {
            const coursesRef = collection(db, "Course");
            const q = query(coursesRef, where(documentId(), "in", batch));
            return getDocs(q);
          });
          console.log(coursesPromises);
          const coursesSnapshots = await Promise.all(coursesPromises);
          const coursesData = coursesSnapshots.flatMap((snapshot) =>
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );

          setCourses(coursesData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };
    fetchCourses();
  }, []);

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
                    <a href="/course" className="text-secondary underline pl-1">
                      Browse now.
                    </a>
                  </p>
                </div>
              </div>
            )}

            {courses.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
                {courses.map((course) => (
                  <div key={course.id} className="">
                    <NewCourseCard
                      key={course.id}
                      {...course.formData}
                      courseId={course.courseId}
                      sections={course.sections}
                      isStudent={true}
                    />
                  </div>
                ))}
              </div>
            )}
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
