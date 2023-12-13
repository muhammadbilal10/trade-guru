import React from 'react'
import { Link } from "react-router-dom";
import Sidenav from '../navbar/sidenav';
import Topnav from '../navbar/topnavbar';
import { FaEdit } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import Card from '../card';
import { MdPendingActions } from "react-icons/md";
import Instructortable from './instructortable';
import EditTable from './InstructorEditTable';
import ApproveTable from './instructorApproveTable';


export default function ApproveInstructor() {

  

    return (
        <>
            <div class="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden': isSideMenuOpen ">
                <Sidenav />
                <div class="flex flex-col flex-1 w-full">
                    <Topnav />
                    <main class="h-full overflow-y-auto">
                        <div class="container px-6 mx-auto grid">
                            <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                                Admin Dashboard
                            </h2>
                            <a
                                class="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple"
                                href=""
                            >
                                <div class="flex items-center">
                                    <svg
                                        class="w-5 h-5 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        ></path>
                                    </svg>
                                    <span>Star this project on GitHub</span>
                                </div>
                                <span>View more &RightArrow;</span>
                            </a>
                            <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                                {/* instructor side stats card */}
                                <Card title={"Total Instructor"} count={6} Icon={<FaChalkboardTeacher />} color={'green-500'} />
                                <Card title={"Total pending approvals"} count={6} Icon={<MdPendingActions />} />
                                <Card title={"Total Edit request"} count={6} Icon={<FaEdit />} />
                            </div>

                            <ApproveTable />



                        </div>
                    </main>
                </div>
            </div>
        </>


    )
}
