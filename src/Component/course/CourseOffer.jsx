import React from "react";
import OfferCourseCard from "./OfferCourseCard";
import PhpImage from "/assets/img/login-office.jpeg";
import OOP from "/assets/OOP.png";
import PHP from "/assets/PHP.png";
import WEB from "/assets/WEB.png";
import AI from "/assets/AI.png";
import CC from "/assets/CC.png";
import DB from "/assets/DB.png";
import SE from "/assets/SE.png";
import ML from "/assets/ML.png";

const CourseOffer = () => {
  const offerCourseList = [
    {
      id: 1,
      title: "PHP Development",
      imageUrl: PHP,
      professor: "Muhammad Ali",
      enrollment: "50",
    },
    {
      id: 2,
      title: "Object Oriented",
      imageUrl: OOP,
      professor: "Muhammad Ali",
      enrollment: "90",
    },
    {
      id: 3,
      title: "Web Development",
      imageUrl: WEB,
      professor: "Muhammad Ali",
      enrollment: "60",
    },
    {
      id: 4,
      title: "Artificial Intelligence",
      imageUrl: AI,
      professor: "Muhammad Ali",
      enrollment: "70",
    },
    {
      id: 5,
      title: "Cloud Computing",
      imageUrl: CC,
      professor: "Muhammad Ali",
      enrollment: "80",
    },
    {
      id: 6,
      title: "Database Management",
      imageUrl: DB,
      professor: "Muhammad Ali",
      enrollment: "60",
    },
    {
      id: 7,
      title: "Software Engineering",
      imageUrl: SE,
      professor: "Muhammad Ali",
      enrollment: "30",
    },
    {
      id: 8,
      title: "Machine Learning",
      imageUrl: ML,
      professor: "Muhammad Ali",
      enrollment: "40",
    },
  ];
  return (
    <div className="bg-white p-4 px-8 rounded-lg mx-12  mt-8">
      <h1 className="text-[#666666] text-2xl font-semibold border-b border-gray-300 pb-2 mb-4">
        All courses
      </h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {offerCourseList.map((course) => (
          <div key={course.id}>
            <OfferCourseCard {...course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseOffer;
