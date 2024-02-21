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
import NewCourseCard from "./NewCourseCard";
import SearchBar from "./SearchBar";
import PriceFilter from "./PriceFilter";
import SkillLevelFilter from "./SkillLevelFilter";
import LanguageFilter from "./LanguageFilter";
import RatingFilter from "./RatingFilter";
import CategoryList from "./CategoryList";

const CourseOffer = () => {
  const offerCourseList = [
    {
      id: 1,
      title: "PHP Development",
      description: "Increasing Engagement with Instagram & Facebook",
      imageUrl: PHP,
      professor: "Muhammad Ali",
      enrollment: "50",
      price: "$29.28",
    },
    {
      id: 2,
      title: "Object Oriented",
      description: "Increasing Engagement with Instagram & Facebook",
      imageUrl: OOP,
      professor: "Muhammad Ali",
      enrollment: "90",
      price: "Free",
    },
    {
      id: 3,
      title: "Web Development",
      description: "Increasing Engagement with Instagram & Facebook",
      imageUrl: WEB,
      professor: "Muhammad Ali",
      enrollment: "60",
      price: "Free",
    },
    {
      id: 4,
      title: "Artificial Intelligence",
      description: "Increasing Engagement with Instagram & Facebook",
      imageUrl: AI,
      professor: "Muhammad Ali",
      enrollment: "70",
      price: "$72.39",
    },
    {
      id: 5,
      title: "Cloud Computing",
      description: "Increasing Engagement with Instagram & Facebook",
      imageUrl: CC,
      professor: "Muhammad Ali",
      enrollment: "80",
      price: "Free",
    },
    {
      id: 6,
      title: "Database Management",
      description: "Increasing Engagement with Instagram & Facebook",
      imageUrl: DB,
      professor: "Muhammad Ali",
      enrollment: "60",
      price: "Free",
    },
    {
      id: 7,
      title: "Software Engineering",
      description: "Increasing Engagement with Instagram & Facebook",
      imageUrl: SE,
      professor: "Muhammad Ali",
      enrollment: "30",
      price: "Free",
    },
    {
      id: 8,
      title: "Machine Learning",
      description: "Increasing Engagement with Instagram & Facebook",
      imageUrl: ML,
      professor: "Muhammad Ali",
      enrollment: "40",
      price: "$29.28",
    },
  ];

  const initialDisplayCourses = 6;
  const numberOfCourseToDisplay = 4;
  const [displayCourses, setDisplayCourses] = React.useState(
    initialDisplayCourses
  );

  const handleLoadMore = () => {
    setDisplayCourses((prevCount) => prevCount + numberOfCourseToDisplay);
  };
  return (
    <div className="bg-white px-4 rounded-lg mx-auto max-w-xl md:max-w-2xl lg:max-w-6xl mt-8">
      <div className="grid grid-cols-12 gap-[30px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] lg:col-span-8 col-span-12">
          {offerCourseList.slice(0, displayCourses).map((course) => (
            <div key={course.id}>
              <NewCourseCard {...course} />
            </div>
          ))}
        </div>
        <div class="lg:col-span-4 col-span-12 space-y-10">
          <SearchBar />
          <PriceFilter />
          <CategoryList />
          <SkillLevelFilter />
          <LanguageFilter />
          <RatingFilter />
        </div>
        {displayCourses < offerCourseList.length && (
          <div className="flex justify-center  col-span-8">
            <button
              onClick={handleLoadMore}
              className="bg-primary text-white font-semibold px-10 py-4 rounded-lg shadow hover:bg-primary-600 transition duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseOffer;
