import React, { useEffect, useState, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function HomeHero({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideInterval = useRef(null);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const startSlideShow = () => {
    stopSlideShow();
    slideInterval.current = setInterval(() => {
      goToNext();
    }, 3000);
  };

  const stopSlideShow = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  useEffect(() => {
    startSlideShow();
    return () => stopSlideShow();
  }, [currentIndex]);

  return (
    <div className="relative">
      <div className="relative text-white h-96 flex items-center justify-center text-center min-h-screen">
        {images.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
        <div className="z-10 p-5 bg-opacity-50 bg-black rounded-md shadow-md">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Find Your Dream Course
          </h1>
          <h2 className="text-xl font-bold sm:text-2xl">Trade Guru</h2>
          <p className="mt-4 max-w-lg mx-auto w-80 sm:w-full">
            We are recognized for exceeding client expectations and delivering
            great results through dedication, ease of process, and extraordinary
            services to our worldwide clients.
          </p>
        </div>
      </div>
      <div className="absolute sm:top-1/2 left-0 transform -translate-y-1/2 sm:pl-5 top-3/4 pl-20">
        <button
          onClick={goToPrevious}
          className="bg-black text-white p-4 rounded-full shadow-lg focus:outline-none"
          aria-label="Previous slide"
        >
          <FaArrowLeft />
        </button>
      </div>
      <div className="absolute top-3/4 sm:top-1/2 right-0 transform -translate-y-1/2 sm:pr-5 pr-20">
        <button
          onClick={goToNext}
          className="bg-black text-white p-4 rounded-full shadow-lg focus:outline-none"
          aria-label="Next slide"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default HomeHero;
