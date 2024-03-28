import { React, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function PlanCard({ data, isInstructor = false }) {
  console.log(data);

  const navigate = useNavigate();

  const newParams = new URLSearchParams();
  newParams.set("type", "Ad");

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-10">
        <h2 className="font-semibold text-lg">{data.title}</h2>
        <p className=" text-gray-600 mt-1 line-clamp-3 ">{data.description}</p>
        <div className="flex items-baseline my-8">
          <span className="text-3xl font-extrabold">${data.price}</span>
          <span className="text-gray-500">/month</span>
        </div>
        <button
          onClick={() =>
            navigate(`/checkout/${data.AdId}/?${newParams.toString()}`)
          }
          className="block w-full bg-primary hover:bg-primary-600 text-white font-semibold rounded-lg px-4 py-2 focus:outline-none"
        >
          Buy plan
        </button>
        <ul className="mt-8 space-y-4">
          {data.feature?.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg
                className="text-green-500 w-6 h-6 mr-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        {/* <ul className="mt-8 space-y-4">
          <li className="flex items-center">
            <svg
              className="text-green-500 w-6 h-6 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            5 products
          </li>
          <li className="flex items-center">
            <svg
              className="text-green-500 w-6 h-6 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            Up to 1,000 subscribers
          </li>
          <li className="flex items-center">
            <svg
              className="text-green-500 w-6 h-6 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            Basic analytics
          </li>
          <li className="flex items-center">
            <svg
              className="text-green-500 w-6 h-6 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            48-hour support response time
          </li>
        </ul> */}
      </div>
    </div>
  );
}
