import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NewCourseCard from "../../../course/NewCourseCard";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import app from "../../../../database/firebase";
import Cookies from "universal-cookie";
import Card from "../../card";
import { FaChalkboardTeacher } from "react-icons/fa";

export default function CoursePage({
  nextStep,
  formData,
  setFormData,
  setSections,
  setImage,
  setType,
  setId,
}) {
  const [courses, setCourses] = React.useState([]);
  const [courseCount, setCourseCount] = React.useState(0);
  const cookies = new Cookies();

  useEffect(() => {
    const db = getFirestore(app);
    const getCourse = async () => {
      const collectionName = "Course";
      const docRef = collection(db, collectionName);
      const instructorId = cookies.get("userId");

      try {
        const querySnapshot = await getDocs(docRef);
        const coursesArray = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().instructorId === instructorId) {
            coursesArray.push({ id: doc.id, ...doc.data() });
            setCourseCount((prev) => prev + 1);
          }
        });
        setCourses(coursesArray);
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    };
    getCourse();
  }, []);

  const handleEdit = async (id) => {
    const db = getFirestore(app);
    const docRef = doc(db, "Course", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setFormData(docSnap.data().formData);
      setImage(docSnap.data().formData.imageUrl);
      console.log(docSnap.data().sections);
      setSections(docSnap.data().sections);
      setType("Edit");
      setId(id);
      nextStep();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const handleDelete = async (id) => {
    const db = getFirestore(app);
    const docRef = doc(db, "Course", id);
    try {
      await deleteDoc(docRef);
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
    window.location.reload();
  };

  return (
    <>
      <div className="mt-6 text-end space-y-2">
        <div className="flex justify-between items-center mb-5">
          <div className="w-72">
            <Card
              title={"Total Course"}
              Icon={<FaChalkboardTeacher />}
              count={courseCount}
            />
          </div>
          <button
            onClick={() => {
              setType("Add");
              nextStep();
            }}
            className=" bg-primary h-12 w-32 hover:bg-primary-600 text-white p-3 rounded-md focus:outline-none focus:shadow-outline-blue "
          >
            Add Course
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {courses.map((course) => (
            <div key={course.id} className="">
              <NewCourseCard
                key={course.id}
                {...course.formData}
                courseId={course.courseId}
                sections={course.sections}
                isInstructor={true}
                handleEdit={() => handleEdit(course.id)}
                handleDelete={() => handleDelete(course.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
