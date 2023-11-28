import React from 'react'
import Navbar from '../navbar/navbar'
import LoginNavbar from '../navbar/loginnavbar'

export default function Instructorform() {
    return (
        <>
        <Navbar />
            <div class="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden': isSideMenuOpen ">
                
                <div class="flex flex-col flex-1 w-full">
                    
                    <main class="h-full overflow-y-auto">
                        <div class="container px-6 mx-auto grid">
                            <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                                Instructor registration form
                            </h2>
                            {/* <!-- CTA --> */}
                            <a class="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple">
                                <div class="flex items-center">
                                    <svg
                                        class="w-5 h-5 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <span>Star this project on GitHub</span>
                                </div>
                                <span>View more &RightArrow;</span>
                            </a>
                            {/* <!-- General elements --> */}
                            <h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
                                basic info form
                            </h4>

                            <div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                                {/* first name */}
                                <label class="block text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">First name</span>
                                    <input
                                        class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                        placeholder="xyz" />
                                </label>

                                {/* Last name */}
                                <label class="block text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">Last name</span>
                                    <input
                                        class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                        placeholder="xyz" />
                                </label>

                                <label class="block mt-4 text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">
                                        gender
                                    </span>
                                    <select
                                        class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                    >
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>not to answar</option>
                                    </select>
                                </label>


                                <label class="block mt-4 text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">Biography</span>
                                    <textarea
                                        class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                        rows="3"
                                        placeholder="Enter some long form content."
                                    ></textarea>
                                </label>

                                <label class="block mt-4 text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">
                                        Language
                                    </span>
                                    <select
                                        class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                    >
                                        <option>Urdu</option>
                                        <option>English</option>
                                        <option>Punjabi</option>
                                        <option>Arabic</option>
                                    </select>
                                </label>

                                <div>
                                    <button
                                        class="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                    >
                                        next
                                    </button>
                                </div>
                            </div>



                        </div>
                    </main>
                </div>
            </div>




        </>
    )
}
