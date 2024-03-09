import React from 'react'
import { useState, useEffect } from 'react';
import app from "../../../database/firebase";
import { getFirestore,query, collection, where, getDocs } from 'firebase/firestore';
import ApproveModal from './approvalModal';
import { FcApproval } from "react-icons/fc";
export default function ApprovalTable() {

  
    const [Open, setOpen] = useState(false)
    const [user, setUser] = useState(null);
    const [uid, setUid] = useState(null);
   
    const db = getFirestore(app);
    useEffect(() => {
        // Assuming 'Instructor' is the name of your collection
        const collectionName = 'Instructor';
        const myCollection = collection(db, collectionName);
    
        // Create a query to get documents with status false
        const statusFalseQuery = query(myCollection, where('approval', '==', false));
    
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(statusFalseQuery);
                const userData = querySnapshot.docs.map(doc => doc.data());
                setUser(userData);
            } catch (error) {
                console.error('Error getting documents:', error);
            }
        };
    
        fetchData();
    }, []);

    const handleClick = (id) => {
        console.log(id);
        setUid(id);
        setOpen(true);
    };


    return (
        <>
            <h4
                class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300"
            >
                Table with actions
            </h4>
            <div class="w-full overflow-hidden rounded-lg shadow-xs">
                <div class="w-full overflow-x-auto">
                    <table class="w-full whitespace-no-wrap">
                        <thead>
                            <tr
                                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                            >
                                <th class="px-4 py-3">Name</th>
                                <th class="px-4 py-3">total course</th>
                                <th class="px-4 py-3">Status</th>
                                <th class="px-4 py-3">Request Date</th>
                                <th class="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody
                            class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                        >
                            
                            {user?.map((user) => {
                                console.clear()
                                console.log("User", user)
                                return(
                                    <tr class="text-gray-700 dark:text-gray-400">
                                    <td class="px-4 py-3">
                                        <div class="flex items-center text-sm">
                                            {/* <!-- Avatar with inset shadow --> */}
                                            <div
                                                class="relative hidden w-8 h-8 mr-3 rounded-full md:block"
                                            >
                                                <img
                                                    class="object-cover w-full h-full rounded-full"
                                                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                                    alt=""
                                                    loading="lazy"
                                                />
                                                <div
                                                    class="absolute inset-0 rounded-full shadow-inner"
                                                    aria-hidden="true"
                                                ></div>
                                            </div>
                                            <div>
                                                <p class="font-semibold">{user.fname}</p>
                                                <p class="text-xs text-gray-600 dark:text-gray-400">
                                                    {user.experiance}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {user.totalCourse}
                                    </td>
                                    <td class="px-4 py-3 text-xs">
                                    <span
                                            className={`px-2 py-1 font-semibold leading-tight rounded-full ${user.status
                                                ? 'text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100'
                                                : 'text-red-700 bg-red-100 dark:bg-red-700 dark:text-red-100'
                                                }`}
                                        >
                                            {user.approval ? 'approved' : 'not approved'}
                                        </span>
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                    {user.date}
                                    </td>


                                    <td class="px-4 py-3">

                                        <div class="flex items-center space-x-4 text-sm">

                                            <button
                                                class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                                aria-label="Edit"
                                                key={user.id}
                                                onClick={() => handleClick(user.id)}
                                            >

                                                <FcApproval class="w-5 h-5" />

                                            </button>  
                                        </div>
                                    </td>
                                </tr>
                                )
                             }
                            )}
                        </tbody>
                    </table>
                </div>
                <div
                    class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
                >
                    <span class="flex items-center col-span-3">
                        Showing 21-30 of 100
                    </span>
                    <span class="col-span-2"></span>
                    {/* <!-- Pagination --> */}
                    <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                        <nav aria-label="Table navigation">
                            <ul class="inline-flex items-center">
                                <li>
                                    <button
                                        class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                                        aria-label="Previous"
                                    >
                                        <svg
                                            class="w-4 h-4 fill-current"
                                            aria-hidden="true"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                clip-rule="evenodd"
                                                fill-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                                    >
                                        1
                                    </button>
                                </li>
                                <li>
                                    <button
                                        class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                                    >
                                        2
                                    </button>
                                </li>
                                <li>
                                    <button
                                        class="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple"
                                    >
                                        3
                                    </button>
                                </li>
                                <li>
                                    <button
                                        class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                                        aria-label="Next"
                                    >
                                        <svg
                                            class="w-4 h-4 fill-current"
                                            aria-hidden="true"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clip-rule="evenodd"
                                                fill-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </span>
                </div>
              {
                
                <ApproveModal IsOpen={Open} setIsOpen={setOpen} id={uid} setId={setUid} />
              }
                


            </div>



        </>
    )
}



