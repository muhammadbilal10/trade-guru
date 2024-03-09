import React, { useState } from "react";
import { Link } from "react-router-dom";
//icons
import { FiUser, FiBookOpen } from "react-icons/fi";
import { MdOutlinePayments } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";

export default function Sidenav() {
  const [togglePages, setTogglePages] = useState(false);

  const [toggleInstructor, setToggleInstructor] = useState(false);
  const [togglestudent, setToggleStudent] = useState(false);
  const [togglecourse, setToggleCourse] = useState(false);
  const [toggleadvirtisment, setToggleAdvirtisment] = useState(false);
  const [togglepayment, setTogglePayment] = useState(false);
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

          <ul>
            <li class="relative px-6 py-3">
              <button
                class="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                onClick={() => setToggleInstructor(!toggleInstructor)}
                aria-haspopup="true"
              >
                <span class="inline-flex items-center">
                  <FiBookOpen className="w-5 h-5" />

                  <span class="ml-4">Instructor</span>
                </span>
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <template className={`${toggleInstructor ? "block" : "hidden"}`}>
                <ul
                  class="transition-all ease-in-out duration-300 p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                  aria-label="submenu"
                >
                  <Link to={"/instructorpage"}>
                    <li class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                      <a class="w-full" href="pages/login.html">
                        manage instructor
                      </a>
                    </li>
                  </Link>

                  <Link to={"/approveinstructor"}>
                    <li class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                      <a class="w-full" href="pages/create-account.html">
                        Aprrovals
                      </a>
                    </li>
                  </Link>

                  <Link to={"/instructorpage"}>
                    <li class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                      <a class="w-full" href="pages/forgot-password.html">
                        Instructors
                      </a>
                    </li>
                  </Link>
                </ul>
              </template>
            </li>

            <li class="relative px-6 py-3">
              <button
                class="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                //@click="togglePagesMenu"
                onClick={() => setToggleStudent(!togglestudent)}
                aria-haspopup="true"
              >
                <span class="inline-flex items-center">
                  <FiUser className="w-5 h-5" />

                  <span class="ml-4">Studet</span>
                </span>
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>

              <template className={`${togglestudent ? "block" : "hidden"}`}>
                <ul
                  class="transition-all ease-in-out duration-300 p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                  aria-label="submenu"
                >
                  <Link to={"/student_page"}>
                    <li class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                      <a class="w-full" href="pages/login.html">
                        manage Students
                      </a>
                    </li>
                  </Link>

                  <Link to={"/instructorpage"}>
                    <li class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                      <a class="w-full" href="pages/create-account.html">
                        Aprrovals
                      </a>
                    </li>
                  </Link>

                  <Link to={"/instructorpage"}>
                    <li class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                      <a class="w-full" href="pages/forgot-password.html">
                        queries
                      </a>
                    </li>
                  </Link>
                </ul>
              </template>
            </li>

            {/* <li class="relative px-6 py-3">
              <a
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                href="charts.html"
              >
                <FiUser className='w-5 h-5' />
                <span class="ml-4">Courses</span>
              </a>
            </li> */}

            <li class="relative px-6 py-3">
              <button
                class="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                onClick={() => setToggleCourse(!togglecourse)}
                aria-haspopup="true"
              >
                <div class="inline-flex items-center">
                  <FiUser className="w-5 h-5" />

                  <div class="ml-4">courses</div>
                </div>
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>

              <div className={`${togglecourse ? "block" : "hidden"}`}>
                <ul
                  class="transition-all ease-in-out duration-300 p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                  aria-label="submenu"
                >
                  <Link to={"/instructorpage"}>
                    <div class="px-2 py-1 w-full transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                      manage Students
                    </div>
                  </Link>
                  <Link to={"/coursepage"}>
                    <div class="px-2 py-1 w-full transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                      Add Courses
                    </div>
                  </Link>
                </ul>
              </div>
            </li>

            <li class="relative px-6 py-3">
              <button
                class="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                onClick={() => setTogglePayment(!togglepayment)}
                aria-haspopup="true"
              >
                <div class="inline-flex items-center">
                  <FiUser className="w-5 h-5" />

                  <div class="ml-4">payment</div>
                </div>
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>

              <div className={`${togglepayment ? "block" : "hidden"}`}>
                <ul
                  class="transition-all ease-in-out duration-300 p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                  aria-label="submenu"
                >
                  <Link to={"/instructorpage"}>
                    <div class="px-2 py-1 w-full transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                      pay
                    </div>
                  </Link>
                </ul>
              </div>
            </li>

            <li class="relative px-6 py-3">
              <button
                class="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                onClick={() => setToggleAdvirtisment(!toggleadvirtisment)}
                aria-haspopup="true"
              >
                <div class="inline-flex items-center">
                  <FiUser className="w-5 h-5" />

                  <div class="ml-4">Advirtisment</div>
                </div>
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>

              <div className={`${toggleadvirtisment ? "block" : "hidden"}`}>
                <ul
                  class="transition-all ease-in-out duration-300 p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                  aria-label="submenu"
                >
                  <Link to={"/advertisement"}>
                    <div class="px-2 py-1 w-full transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                      manage add
                    </div>
                  </Link>
                </ul>
              </div>
            </li>

            <li class="relative px-6 py-3">
              <a class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                <FiBookOpen className="w-5 h-5" />
                <span class="ml-4">Tables</span>
              </a>
            </li>

            <li class="relative px-6 py-3">
              <button
                class="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                //@click="togglePagesMenu"
                onClick={() => setTogglePages(!togglePages)}
                aria-haspopup="true"
              >
                <span class="inline-flex items-center">
                  <FiBookOpen className="w-5 h-5" />

                  <span class="ml-4">More options</span>
                </span>
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <template className={`${togglePages ? "block" : "hidden"}`}>
                <ul
                  class="transition-all ease-in-out duration-300 p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                  aria-label="submenu"
                >
                  <li class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                    <a class="w-full" href="pages/login.html">
                      Login
                    </a>
                  </li>
                  <li class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                    <a class="w-full" href="pages/create-account.html">
                      Create account
                    </a>
                  </li>
                  <li class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                    <a class="w-full" href="pages/forgot-password.html">
                      Forgot password
                    </a>
                  </li>
                  <li class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                    <a class="w-full" href="pages/404.html">
                      404
                    </a>
                  </li>
                  <li class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                    <a class="w-full" href="pages/blank.html">
                      Blank
                    </a>
                  </li>
                </ul>
              </template>
            </li>
          </ul>
          <div class="px-6 my-6">
            <button class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-primary border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
              Create account
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
