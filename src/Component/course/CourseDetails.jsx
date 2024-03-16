import React, { useEffect } from "react";
import CourseEnrollCard from "./CourseEnrollCard";
import { useParams } from "react-router-dom";
import ML from "/assets/ML.png";
import RelatedCourse from "./RelatedCourses";
import InstructorDetailsCard from "../instructor/InstructorDetailsCard";
import CourseTabs from "./CourseTabs";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import app from "../../database/firebase";

export default function CourseDetails() {
  const { id } = useParams();
  console.log(id);
  const [course, setCourse] = React.useState({});
  const [lectures, setLectures] = React.useState("");

  const CourseDetails = {
    id: id,
    title: "Machine Learning",
    description: "UI/UX Design and Graphics Learning Bootcamp 2022",
    imageUrl: ML,
    lecture: "20",
    instructor: "John Doe",
    duration: "2Hr 36Minutes",
    level: "Beginner",
    language: "English",
    enroll: "40",
    price: "$29.28",
  };

  const InstructorDetails = {
    name: "Daniel Smith",
    title: "User Experience Designer",
    studentLearned: "2k",
    courses: "65",
    reviews: "547",
    rating: "4.9",
    img: ML,
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
  };

  useEffect(() => {
    const db = getFirestore(app);
    const getCourse = async () => {
      const docRef = doc(db, "Course", id);
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          const totalLecture = docSnap
            .data()
            .sections.reduce(
              (acc, section) => acc + section.lectures.length,
              0
            );
          setLectures(totalLecture);
          setCourse({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };
    getCourse();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-5 px-5 md:max-w-4xl lg:max-w-7xl mx-auto">
      <div className="bg-white  col-span-12 lg:col-span-8 space-y-6">
        <img
          src={course.formData?.imageUrl}
          alt="UI/UX Design and Graphics Learning Bootcamp 2022"
          className="rounded-xl w-full xl:h-[470px] h-[350px] object-cover"
        />
        <p className="text-white bg-secondary w-32 font-bold text-center py-1 rounded-md text-sm  tracking-wide">
          {course.formData?.category}
        </p>
        <h3 className="text-gray-900 text-4xl font-bold max-w-2xl">
          {course.formData?.title}
        </h3>
        <CourseTabs
          instructorId={course.instructorId}
          sections={course.sections}
          courseDetails={course.formData}
        />
      </div>
      <div className="col-span-12 lg:col-span-4 space-y-4">
        {/* <CourseEnrollCard {...CourseDetails} /> */}
        <CourseEnrollCard
          {...course.formData}
          instructorId={course.instructorId}
          totalLecture={lectures}
          courseId={course.courseId}
        />
        <RelatedCourse />
      </div>
    </div>
  );
}
