import React, { useEffect, useState } from "react";
import Sidenav from "../navbar/sidenav";
import Topnav from "../navbar/topnavbar";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import app from "../../../database/firebase";
import PlanCard from "../advertisement/PlanCard";

export default function AdvertismentPage() {
  const [advertismentPlans, setAdvertismentPlans] = useState([]);
  useEffect(() => {
    const getAdvertismentPlans = async () => {
      const db = getFirestore(app);
      try {
        const docRef = collection(db, "AdvertisementPlans");
        const querySnapshot = await getDocs(docRef);
        const advertismentPlanArray = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          advertismentPlanArray.push({ ...doc.data() });
        });
        setAdvertismentPlans(advertismentPlanArray);
      } catch (err) {
        console.error(err.message);
      }
    };
    getAdvertismentPlans();
  }, []);
  return (
    <div>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <Sidenav />
        <div className="flex flex-col flex-1 w-full">
          <Topnav />
          <main className="h-full overflow-y-auto px-5 max-w-7xl mx-12">
            <h1 className="my-6 text-3xl font-semibold text-gray-700 dark:text-gray-200">
              Advertisement Plans
            </h1>
            <div className="grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {advertismentPlans.map((plan, index) => (
                <PlanCard data={plan} key={index} isInstructor={true} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
