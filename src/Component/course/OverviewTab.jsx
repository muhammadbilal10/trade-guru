import React from "react";
import { FaCheck, FaLaptop, FaPencilAlt, FaWifi } from "react-icons/fa";

const learnings = [
  "Learn how perspective works and how to incorporate your art",
  "Learn how to draw basic forms and shapes",
  "Learn how to properly shade and add shadows to your art",
  "Learn how to draw the human face and body",
  "Learn how to draw animals and other objects",
];

const features = [
  { icon: FaLaptop, text: "Computer/Mobile" },
  { icon: FaPencilAlt, text: "Paper & Pencil" },
  { icon: FaWifi, text: "Internet Connect" },
];

const LearningList = () => (
  <div className="space-y-2">
    {learnings.map((learning, index) => (
      <div key={index} className="flex items-center">
        <FaCheck className="text-secondary mr-2" />
        <span className="text-gray-500">{learning}</span>
      </div>
    ))}
  </div>
);

const FeatureList = () => (
  <div className="flex justify-between items-center">
    {features.map((feature, index) => (
      <div key={index} className="flex items-center">
        <feature.icon className="text-blue-500 mr-2" />
        <span className="text-gray-700">{feature.text}</span>
      </div>
    ))}
  </div>
);

const OverviewTab = () => {
  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Course Description</h2>
      <p className="text-gray-500 mb-4">
        This tutorial will help you learn quickly and thoroughly. Lorem ipsum,
        or lipsum as it sometimes known, is dummy text used in laying out print,
        graphic or web designs. Lorem ipsum dolor sit amet, consectetuer
        adipiscing elit. Donec odio. Quisque volutpat mattis eros.
      </p>
      <p className="text-gray-500">
        You’ll be exposed to principles and strategies, but, more importantly,
        you’ll learn how actually apply these abstract concepts by coding three
        different websites for three very different the audiences. Lorem ipsum
        is dummy text used in laying out print, graphic or web designs Lorem
        ipsum blinding shot chinwag knees.
      </p>
      <h2 className="text-xl font-semibold mb-4 mt-4">What You will Learn?</h2>
      <LearningList />
      {/* <FeatureList /> */}
    </div>
  );
};

export default OverviewTab;
