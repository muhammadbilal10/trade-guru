import React from "react";

const Hero = () => {
  const imageURL =
    "https://bestwpware.com/html/tf/edumim/assets/images/all-img/bred.png";
  return (
    <div className="mt-10 mb-24 relative">
      <img src={imageURL} alt="hero" className="w-full h-96 object-cover" />
      <h2 className="absolute left-[40%]  sm:left-[46%] top-1/2 text-4xl font-bold"></h2>
    </div>
  );
};

export default Hero;
