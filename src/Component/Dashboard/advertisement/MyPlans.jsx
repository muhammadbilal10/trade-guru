import { React, useState, useEffect } from "react";
import Sidenav from "../navbar/sidenav";
import Topnav from "../navbar/topnavbar";
import Card from "../card";

import { MdPendingActions } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";

import app from "../../../database/firebase";
import { getFirestore, getDoc, getDocs, collection } from "firebase/firestore";

import AddModal from "./Modals/AddModal";
import Addfoam from "./AddPlan";
import Editfoam from "./EditPlan";
import PlanCard from "./PlanCard";
export default function MyPlans() {
  const [data, setData] = useState([]);
  const db = getFirestore(app);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mycollection = collection(db, "AdvertisementPlans");
        const doc = await getDocs(mycollection);

        const Data = doc.docs.map((doc) => doc.data());
        setData(Data);
      } catch (error) {
        console.error("Error getting documents:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* {IsOpen && <AddModal isOpen={IsOpen} setIsOpen={setIsOpen} />} */}
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

              <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <button
                  className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                  // onClick={handleAddPlan}
                >
                  Add Plan
                </button>
                <button
                  className="p-4 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  // onClick={handleEditPlan}
                >
                  Edit Plan
                </button>
                <button
                  className="p-4 bg-red-500 text-white rounded hover:bg-red-600"
                  // onClick={handleDeletePlan}
                >
                  Delete Plan
                </button>
              </div>

              {/* {isFoamOpen && addfoam && <Addfoam setIsetIsFoamOpen={setIsFoamOpen} setAddfoam={setAddfoam} />}
              {isFoamOpen && editfoam && <Editfoam setIsetIsFoamOpen={setIsFoamOpen} setEditfoam={setEditfoam} />} */}
              {/* {isFoamOpen &&deletefoam && <Addfoam setIsetIsFoamOpen={setIsFoamOpen} setAddfoam={setAddfoam} />} */}

              <div className="grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data?.map((data, index) => (
                  <PlanCard data={data} key={index} />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
