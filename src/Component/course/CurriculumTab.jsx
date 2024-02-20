import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaPlayCircle,
  FaLock,
  FaFileAudio,
  FaBook,
} from "react-icons/fa";

const accordionData = [
  {
    title: "Introduction",
    content: `Intermediate Level. This tutorial will help you learn quickly and thoroughly. Lorem ipsum is dummy text used in laying out print, graphic or web designs`,
    lectures: "3 Lectures, 34:51 min",
    details: "2 Videos, 1 Audio, 1 Notebook",
    items: [
      {
        type: "video",
        title: "Getting Started and Introductions",
        preview: true,
      },
      { type: "audio", title: "Connecting Through Technology", preview: false },
      {
        type: "notebook",
        title: "Connecting Through Technology",
        preview: false,
      },
    ],
  },
  {
    title: "Chapter 1: The Basics",
    content: `Beginner Level. This tutorial will help you learn quickly and thoroughly. Lorem ipsum is dummy text used in laying out print, graphic or web designs`,
    lectures: "5 Lectures, 1:51:51 min",
    details: "3 Videos, 2 Notebooks",
    items: [
      { type: "video", title: "What is it?", preview: true },
      { type: "video", title: "Where does it come from?", preview: true },
      { type: "video", title: "Why do we use it?", preview: true },
      { type: "notebook", title: "Where does it come from?", preview: false },
      { type: "notebook", title: "Why do we use it?", preview: false },
    ],
  },
  {
    title: "Chapter 2: Advanced",
    content: `Advanced Level. This tutorial will help you learn quickly and thoroughly. Lorem ipsum is dummy text used in laying out print, graphic or web designs`,
    lectures: "7 Lectures, 2:51:51 min",
    details: "5 Videos, 2 Notebooks",
    items: [
      { type: "video", title: "Where can I get some?", preview: true },
      { type: "video", title: "Where can I get some?", preview: true },
      { type: "video", title: "Where can I get some?", preview: true },
      { type: "video", title: "Where can I get some?", preview: true },
      { type: "video", title: "Where can I get some?", preview: true },
      { type: "notebook", title: "Where can I get some?", preview: false },
      { type: "notebook", title: "Where can I get some?", preview: false },
    ],
  },
];

const AccordionItem = ({ section, isActive, setActive }) => {
  const Icon = section.items[0].preview ? FaPlayCircle : FaLock;

  return (
    <div className="mb-4">
      <div
        className={`flex justify-between items-center cursor-pointer px-4 py-2 text-white ${
          isActive ? "bg-teal-600" : "bg-secondary"
        }`}
        onClick={setActive}
      >
        {isActive ? <FaChevronUp /> : <FaChevronDown />}
        <span className="flex-grow text-left mx-2 font-semibold text-lg">
          {section.title}
        </span>
        <span className="text-lg">{section.lectures}</span>
      </div>
      {isActive && (
        <div className="border-t border-gray-200 bg-gray-50 px-4 py-2">
          {/* <p className="text-gray-700 text-sm">{section.content}</p>
          <p className="text-gray-500 text-xs">{section.details}</p> */}
          {section.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-1">
              <span className="flex items-center">
                <Icon className="mr-2 text-secondary" />
                <span className="text-gray-700 font-semibold">
                  {item.title}
                </span>
              </span>
              <button
                className={`px-4 py-1 text-xs rounded ${
                  item.preview
                    ? "bg-primary text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {item.preview ? "Preview" : "Locked"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CurriculumTab = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleSetActive = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-white">
      <h2 className="text-2xl font-semibold mb-4">Course Description</h2>
      <div className="mb-4">
        <span className="text-lg text-gray-500 font-medium px-2 py-1">
          Level Beginner
        </span>
        <span className="text-lg mx-2 text-gray-500">12 Lectures</span>
        <span className="text-lg text-gray-500">
          Total: 5 Hours 56 Minutes 24 Seconds
        </span>
      </div>
      {accordionData.map((section, index) => (
        <AccordionItem
          key={index}
          section={section}
          isActive={activeIndex === index}
          setActive={() => handleSetActive(index)}
        />
      ))}
    </div>
  );
};

export default CurriculumTab;
