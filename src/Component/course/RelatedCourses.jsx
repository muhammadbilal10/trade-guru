import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import Course1Image from "/assets/OOP.png";
import Course2Image from "/assets/PHP.png";
import Course3Image from "/assets/WEB.png";

const courses = [
  {
    id: 1,
    image: Course1Image,
    title: "Greatest Passion In...",
    price: "$38.00",
    rating: 4,
  },
  {
    id: 2,
    image: Course2Image,
    title: "Greatest Passion In...",
    price: "$38.00",
    rating: 5,
  },
  {
    id: 3,
    image: Course3Image,
    title: "Greatest Passion In...",
    price: "$38.00",
    rating: 3,
  },
];

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white flex items-center">
      <div className="w-20 h-20 rounded-md">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => {
            return index < course.rating ? (
              <FaStar key={index} className="text-yellow-400" />
            ) : (
              <FaRegStar key={index} className="text-yellow-400" />
            );
          })}
        </div>
        <h5 className="text-gray-900 text-lg mt-2 font-medium">
          {course.title}
        </h5>
        <p className="text-secondary font-bold text-lg mt-1">{course.price}</p>
      </div>
    </div>
  );
};

const RelatedCourses = () => {
  return (
    <div className="p-4 bg-white rounded-md shadow-lg w-full">
      <h4 className="text-2xl font-bold mb-4">Related Courses</h4>
      <div className="space-y-4">
        {courses.map((course, index) => (
          <div>
            <CourseCard key={course.id} course={course} />
            {index != courses.length - 1 && (
              <div class="divider my-4">
                <hr class="border-t border-gray-300" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedCourses;
