import { FaUser, FaFile, FaStar, FaThumbsUp } from "react-icons/fa";
import ML from "/assets/ML.png";

const InstructorDetailsCard = ({
  fname,
  title,
  studentLearned,
  courses,
  reviews,
  rating,
  totalCourse,
  description,
  img,
}) => {
  const insitem = [
    {
      id: 1,
      icon: FaFile,
      value: totalCourse + "+ Courses",
    },
    {
      id: 2,
      icon: FaUser,
      value: !studentLearned + "+ Students Learned",
    },
    {
      id: 3,
      icon: FaStar,
      value: !reviews + " Reviews",
    },
    {
      id: 4,
      icon: FaThumbsUp,
      value: rating || "4.9",
    },
  ];
  return (
    <div className="">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="h-[310px] w-[300px]">
          <img
            src={`https://bestwpware.com/html/tf/edumim/assets/images/all-img/ux.png`}
            alt="Instructor"
            className="w-full object-cover rounded-md h-full  mr-4"
          />
        </div>

        <div>
          <h3 className="text-2xl font-semibold">{fname}</h3>
          <p className="text-primary">{title || "User Experience Designers"}</p>
          <div className="flex flex-col mt-2">
            {insitem.map((item) => (
              <div key={item.id} className="flex items-center mr-4">
                <item.icon className="text-secondary mr-2" />
                <p className="text-gray-500 text-lg">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-700">
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form, by injected humour, or
        randomised words which don't look even slightly believable.
      </p>
    </div>
  );
};

export default InstructorDetailsCard;
