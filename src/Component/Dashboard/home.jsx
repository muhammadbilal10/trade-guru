import React from 'react'
import { Link } from "react-router-dom";
import Sidenav from './navbar/sidenav';
import Topnav from './navbar/topnavbar';

import Card from './card';

import Instructortable from './instructor/instructortable';
import { MdPendingActions } from "react-icons/md";

export default function DashboardHome() {
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
              {/* <!-- CTA --> */}
              <a
                class="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-primary rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple"
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
              {/* <!-- Cards --> */}
              <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                 {/* <!-- Card --> */}
                 <Card title={"Total Users"} count={6} Icon={<MdPendingActions/>}/>
                {/* <!-- Card --> */}
                <Card title={"Total course"} count={6} Icon={<MdPendingActions/>} color={'green-500'}/>
                {/* <!-- Card --> */}
                <Card title={"Total pending approvals"} count={6} Icon={<MdPendingActions/>}/>
                {/* <!-- Card --> */}
                <Card title={"Total course"} count={6} Icon={<MdPendingActions/>}/>
                {/* <!-- Card -->
                <Card title={"Total Instructor"} count={6} Icon={<MdPendingActions/>}/> */}
              </div>

              {/* <!--  Table --> */}
              <Instructortable/>
              {/* <!-- Charts --> */}
              <h2
                class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
              >
                Charts
              </h2>
              <div class="grid gap-6 mb-8 md:grid-cols-2">
                <div
                  class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
                >
                  <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                    Revenue
                  </h4>
                  <canvas id="pie"></canvas>
                  <div 
                  class="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400"
                  >
                    {/* <!-- Chart legend --> */}
                    <div class="flex items-center">
                      <span
                        class="inline-block w-3 h-3 mr-1 bg-blue-500 rounded-full"
                      ></span>
                      <span>Shirts</span>
                    </div>
                    <div class="flex items-center">
                      <span
                        class="inline-block w-3 h-3 mr-1 bg-teal-600 rounded-full"
                      ></span>
                      <span>Shoes</span>
                    </div>
                    <div class="flex items-center">
                      <span
                        class="inline-block w-3 h-3 mr-1 bg-purple-600 rounded-full"
                      ></span>
                      <span>Bags</span>
                    </div>
                  </div>
                </div>
                <div
                  class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
                >
                  <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                    Traffic
                  </h4>
                  <canvas id="line"></canvas>
                  <div
                    class="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400"
                  >
                    {/* <!-- Chart legend --> */}
                    <div class="flex items-center">
                      <span
                        class="inline-block w-3 h-3 mr-1 bg-teal-600 rounded-full"
                      ></span>
                      <span>Organic</span>
                    </div>
                    <div class="flex items-center">
                      <span
                        class="inline-block w-3 h-3 mr-1 bg-purple-600 rounded-full"
                      ></span>
                      <span>Paid</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>

  )
}
