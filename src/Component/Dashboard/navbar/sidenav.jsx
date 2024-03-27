import React, { useState } from "react";
import { Link } from "react-router-dom";
//icons
import { FiUser, FiBookOpen } from "react-icons/fi";
import { MdOutlinePayments } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { RiAdvertisementLine } from "react-icons/ri";
import { MdOutlinePayment } from "react-icons/md";
import Cookies from "universal-cookie";

export default function Sidenav() {

  const [togglePages, setTogglePages] = useState(false);
  const [togglecourse, setToggleCourse] = useState(false);
  const [togglepayment, setTogglePayment] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const toggleMenu = (index) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const cookies = new Cookies();
  const isAdmin = cookies.get('isAdmin');

  const AdminMenu = [
    {
      title: "Instructor",
      link: "/instructorpage",
      icon: <FiBookOpen className="w-5 h-5" />,
      dropdownOptions: [
        { title: "Manage Instructor", link: "/instructorpage" },
        { title: "Approvals", link: "/approveinstructor" },
        { title: "Instructors", link: "/instructorpage" },
      ],
    },
    {
      title: "Student",
      link: "/student_page",
      icon: <FiUser className="w-5 h-5" />,
      dropdownOptions: [
        { title: "Manage Students", link: "/student_page" },
        { title: "Approvals", link: "/instructorpage" },
        { title: "Queries", link: "/instructorpage" },
      ],
    },
    {
      title: "Advirtisment",
      link: "/advertisement",
      icon: <RiAdvertisementLine className="w-5 h-5" />,
      dropdownOptions: [
        { title: "My Plans", link: "/myplan" },
        { title: "Manage Plans", link: "/advertisement" },
        // { title: "My Plans", link: "/advertisement" },

        ,
      ],
    },
    {
      title: "Payment",
      link: "/paymentpage",
      icon: <MdOutlinePayment className="w-5 h-5" />,
      dropdownOptions: [
        { title: "Home", link: "/paymentpage" },
        { title: "Transactions", link: "/paymentAllTransactions" }],
    },
   

  ];

  const InstructorMenu = [
    // {
    //   title: "Instructor",
    //   link: "/instructorpage",
    //   icon: <FiBookOpen className="w-5 h-5" />,
    //   dropdownOptions: [
    //     { title: "Manage Instructor", link: "/instructorpage" },
    //     { title: "Approvals", link: "/approveinstructor" },
    //     { title: "Instructors", link: "/instructorpage" },
    //   ],
    // },
    {
      title: "courses",
      link: "/student_page",
      icon: <FiUser className="w-5 h-5" />,
      dropdownOptions: [
        { title: "Manage Students", link: "/coursePage" },
        { title: "Add Courses", link: "/coursePage" },
        // { title: "Queries", link: "/instructorpage" },
      ],
    },
    {
      title: "Advertisment-Ins",
      link: "instructorAdvertisment",
      icon: <RiAdvertisementLine className="w-5 h-5" />,
      dropdownOptions: [
        { title: "Advertisment Plans", link: "/inst-advertisment" },
        { title: "Ad Spend", link: "/inst-advertisment" },
      ],
    },
    {
      title: "Feedback",
      link: "/feedback",
      icon: <RiAdvertisementLine className="w-5 h-5" />,
      dropdownOptions: [{ title: "Feedback", link: "/feedback" }],
    },

  ];

  return (
    <>
      <div class="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
        <div class="py-4 text-gray-500 dark:text-gray-400">
          <Link
            to={"/"}
            class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
          >
            <span className="text-xl">Trade</span>
            <span className="text-xl text-primary">Guru.pk</span>
          </Link>

          <ul class="mt-6">
            <Link to={"/dashboard"}>
              <li class="relative px-6 py-3">
                <span
                  class="absolute inset-y-0 left-0 w-1 bg-primary rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
                <div class="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100">
                  <IoHomeOutline />
                  <span class="ml-4">Dashboard</span>
                </div>
              </li>
            </Link>
          </ul>

          {isAdmin && (
            <ul>

              {AdminMenu.map((menuItem, index) => (
                <li key={index} className="relative px-6 py-3">
                  <button
                    className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    aria-haspopup="true"
                    onClick={() => toggleMenu(index)}
                  >
                    <div className="inline-flex items-center">
                      {menuItem.icon}
                      <div className="ml-4">{menuItem.title}</div>
                    </div>
                    <FaAngleDown />
                  </button>

                  <template
                    className={`${openMenuIndex === index ? "block" : "hidden"}`}
                  >
                    <ul
                      className="transition-all ease-in-out duration-300 p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                      aria-label="submenu"
                    >
                      {menuItem.dropdownOptions.map((option, idx) => (
                        <Link to={option.link} key={idx}>
                          <li className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                            {option.title}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </template>
                </li>
              ))}
            </ul>
          )}

          {!isAdmin && (
             <ul>
             {InstructorMenu.map((menuItem, index) => (
               <li key={index} className="relative px-6 py-3">
                 <button
                   className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                   aria-haspopup="true"
                   onClick={() => toggleMenu(index)}
                 >
                   <div className="inline-flex items-center">
                     {menuItem.icon}
                     <div className="ml-4">{menuItem.title}</div>
                   </div>
                   <FaAngleDown />
                 </button>

                 <template
                   className={`${openMenuIndex === index ? "block" : "hidden"}`}
                 >
                   <ul
                     className="transition-all ease-in-out duration-300 p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                     aria-label="submenu"
                   >
                     {menuItem.dropdownOptions.map((option, idx) => (
                       <Link to={option.link} key={idx}>
                         <li className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                           {option.title}
                         </li>
                       </Link>
                     ))}
                   </ul>
                 </template>
               </li>
             ))}
           </ul>
          )}

          <div class="px-6 my-6">
            <button class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-primary border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
              Add account
              <span class="ml-2" aria-hidden="true">
                +
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
