import React from "react";
import PHP from "/assets/PHP.png";

const Hero = () => {
  const imageURL =
    "https://bestwpware.com/html/tf/edumim/assets/images/all-img/bred.png";
  return (
    <div className="my-16 relative">
      <img src={imageURL} alt="hero" className="w-full" />
      <h2 className="absolute left-[46%] top-1/2 text-4xl font-bold">
        Courses
      </h2>
    </div>
  );
};

export default Hero;
