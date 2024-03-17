import { React, useState,useEffect } from "react";
import Sidenav from "../navbar/sidenav";
import Topnav from "../navbar/topnavbar";
import Card from '../card';

import { MdPendingActions } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import AddModal from "./Modals/AddModal";
import Addfoam from "./AddPlan";
import Editfoam from "./EditPlan";
import PlanCard from "./PlanCard";
import app from "../../../database/firebase";
import { getFirestore, getDoc, getDocs, collection } from 'firebase/firestore';


export default function Advertisement() {


  const [isFoamOpen, setIsFoamOpen] = useState(false);
  // const [IsOpen, setIsOpen] = useState(false)
  const [addfoam, setAddfoam] = useState(false)
  const [editfoam, setEditfoam] = useState(false)
  const [deletefoam, setDeletefoam] = useState(false)


  const [IsOpen, setIsOpen] = useState(false)
  const handleAddPlan = () => {
    // setIsOpen(true);

    setIsFoamOpen(true);
    setAddfoam(true);
  };
  const handleEditPlan = () => {
    // Logic for handling the "Edit Plan" button click
    console.log("Edit Plan clicked");
  };

  const handleDeletePlan = () => {
    // Logic for handling the "Delete Plan" button click
    console.log("Delete Plan clicked");
  };

  const [data, setData] = useState([]);
  const db = getFirestore(app);
  useEffect(() => {

    const fetchData = async () => {
      try {
        const mycollection = collection(db, 'AdvertisementPlans');
        const doc = await getDocs(mycollection);

        const Data = doc.docs.map(doc => doc.data());
        setData(Data);
      } catch (error) {
        console.error('Error getting documents:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <>
      {IsOpen && <AddModal isOpen={IsOpen} setIsOpen={setIsOpen} />}
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <Sidenav />

        <div className="flex flex-col flex-1 w-full">
          <Topnav />
          <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
              {/* <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Advertisement Plan
              </h2> */}
              {/* <a
                className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-primary rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple"
                href=""
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    ></path>
                  </svg>
                  <span>instructor approvals here</span>
                </div>
              </a> */}


              {!isFoamOpen && (
                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                  <Card
                    title={"Total Advertisement plan"}
                    count={5}
                    Icon={<FaChalkboardTeacher />}
                    color={"green-500"}
                  />
                  <Card
                    title={"Total ads running"}
                    count={5}
                    Icon={<MdPendingActions />}
                  />
                  <Card title={"Total requests"} count={6} Icon={<FaEdit />} />
                </div>
              )}

              {!isFoamOpen && (
                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                  <button
                    className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleAddPlan}
                  >
                    Add Plan
                  </button>
                  <button
                    className="p-4 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    onClick={handleEditPlan}
                  >
                    Edit Plan
                  </button>
                  <button
                    className="p-4 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={handleDeletePlan}
                  >
                    Delete Plan
                  </button>
                </div>
              )}

              {isFoamOpen && addfoam && <Addfoam setIsetIsFoamOpen={setIsFoamOpen} setAddfoam={setAddfoam} />}
              {isFoamOpen && editfoam && <Editfoam setIsetIsFoamOpen={setIsFoamOpen} setEditfoam={setEditfoam} />}
              {/* {isFoamOpen &&deletefoam && <Addfoam setIsetIsFoamOpen={setIsFoamOpen} setAddfoam={setAddfoam} />} */}



              {/* <PlanCard/> */}




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
                          <th class="px-4 py-3">Date</th>
                          <th class="px-4 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody
                        class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                      >
                        {data?.map((data) => (
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
                                  <p class="font-semibold">{data.title}</p>
                                  <p class="text-xs text-gray-600 dark:text-gray-400">
                                    {data.type}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td class="px-4 py-3 text-sm">
                              {data.price}
                            </td>
                            {/* <td class="px-4 py-3 text-xs">
                              <span
                                className={`px-2 py-1 font-semibold leading-tight rounded-full ${user.status
                                  ? 'text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100'
                                  : 'text-red-700 bg-red-100 dark:bg-red-700 dark:text-red-100'
                                  }`}
                              >
                                {user.status ? 'approved' : 'not approved'}
                              </span>
                            </td> */}
                            <td class="px-4 py-3 text-sm">
                              6/10/2020
                            </td>


                            <td class="px-4 py-3">

                              <div class="flex items-center space-x-4 text-sm">

                                {/* <button
                                  class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                  aria-label="Edit"
                                  onClick={() => handleEditClick(user)}
                                  key={data.AdId}
                                >

                                  <FaEdit class="w-5 h-5" />

                                </button>

                                <button
                                  class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                  aria-label="Delete"
                                  onClick={() => handleDeleteClick(user.id)}
                                  key={user.id}

                                >
                                  <MdDeleteOutline class="w-5 h-5" />

                                </button> */}
                              </div>
                            </td>
                          </tr>


                        ))}
                      </tbody>
                    </table>
                  </div>


                </div>



              </>
            </div>



          </main>
        </div >
      </div >
    </>
  );
}


{/* <!-- CTA --> */ }
{/* <a
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
                  <span>instructor approvals here</span>
                </div>

              </a> */}