import { React, useState, useEffect } from "react";
import Sidenav from "../navbar/sidenav";
import Topnav from "../navbar/topnavbar";
import Card from "../card";

import { MdPendingActions } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import AddModal from "./Modals/AddModal";
import Addfoam from "./AddPlan";
import Editfoam from "./EditPlan";
import PlanCard from "./PlanCard";
import app from "../../../database/firebase";
import {
  getFirestore,
  getDoc,
  getDocs,
  collection,
  doc,
} from "firebase/firestore";
import AdvertisementTable from "./AdvertisementTable";

export default function Advertisement() {
  const [isFoamOpen, setIsFoamOpen] = useState(false);
  // const [IsOpen, setIsOpen] = useState(false)
  const [addfoam, setAddfoam] = useState(false);
  const [editfoam, setEditfoam] = useState(false);
  const [deletefoam, setDeletefoam] = useState(false);
  const [editPlanId, setEditPlanId] = useState("");

  const [IsOpen, setIsOpen] = useState(false);
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

  const handleAddPlan = (id) => {
    // setIsOpen(true);
    if (id) {
      console.log("Edit Plan clicked", id);
      setEditPlanId(id);
      handleEditPlan(id);
    } else {
      setEditPlanId("");
    }
    setIsFoamOpen(true);
    setAddfoam(true);
  };
  const handleEditPlan = async (id) => {
    console.log("Edit clicked", id);
    try {
      const docRef = doc(db, "AdvertisementPlans", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeletePlan = () => {
    // Logic for handling the "Delete Plan" button click
    console.log("Delete Plan clicked");
  };

  const [data, setData] = useState([]);
  const db = getFirestore(app);

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
                    onClick={() => handleAddPlan()}
                  >
                    Add Plan
                  </button>
                </div>
              )}

              {isFoamOpen && addfoam && (
                <Addfoam
                  setIsetIsFoamOpen={setIsFoamOpen}
                  setAddfoam={setAddfoam}
                  editPlanId={editPlanId}
                />
              )}
              {isFoamOpen && editfoam && (
                <Editfoam
                  setIsetIsFoamOpen={setIsFoamOpen}
                  setEditfoam={setEditfoam}
                />
              )}
              {/* {isFoamOpen &&deletefoam && <Addfoam setIsetIsFoamOpen={setIsFoamOpen} setAddfoam={setAddfoam} />} */}

              {/* <PlanCard/> */}
              <AdvertisementTable data={data} handle={handleAddPlan} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

{
  /* <!-- CTA --> */
}
{
  /* <a
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

              </a> */
}

// advertisment plan
