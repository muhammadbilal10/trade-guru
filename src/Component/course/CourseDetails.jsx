import React from "react";
import CourseEnrollCard from "./CourseEnrollCard";
import { useParams } from "react-router-dom";
import ML from "/assets/ML.png";
import RelatedCourse from "./RelatedCourses";

export default function CourseDetails() {
  const { id } = useParams();

  console.log(id);
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
  return (
    <div className="grid grid-cols-12 gap-10 max-w-4xl lg:max-w-7xl mx-auto">
      <div className="bg-white overflow-hidden col-span-12 lg:col-span-8 space-y-6">
        <img
          src={ML}
          alt="UI/UX Design and Graphics Learning Bootcamp 2022"
          className="w-full xl:h-[470px] h-[350px] object-cover"
        />
        <p className="text-white bg-secondary w-32 font-bold text-center py-1 rounded-md text-sm  tracking-wide">
          Data Science
        </p>
        <h3 className="text-gray-900 text-4xl font-bold max-w-2xl">
          UI/UX Design and Graphics Learning Bootcamp 2022
        </h3>
      </div>
      <div className="col-span-12 lg:col-span-4 space-y-4">
        <CourseEnrollCard {...CourseDetails} />
        <RelatedCourse />
      </div>
    </div>
  );
}
