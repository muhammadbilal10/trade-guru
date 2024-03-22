import { React, useEffect, useState } from "react";
import Sidenav from "../navbar/sidenav";
import Topnav from "../navbar/topnavbar";
import Card from "../card";

import { MdPendingActions } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import AddModal from "./Modals/AddModal";

import { setDoc, doc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import app from "../../../database/firebase";
import { getFirestore, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
export default function Addfoam({
  setAddfoam,
  setIsetIsFoamOpen,
  editPlanId = "",
  id,
}) {
  const db = getFirestore(app);
  const navigate = useNavigate();

  const advertisementType = ["Display ad", "Feature"];
  const placement = ["Home Page", "Course page", "both"];
  const pricetype = ["Per day", "defined no. of days"];
  const [priceSection, setPricesection] = useState(false);

  const [planData, setPlanData] = useState({
    type: "",
    price: "",
    description: "",
    pricetype: "",
    duration: "",
    title: "",
    feature: [],
    placement: "",
    AdId: "",
    custom: false,
  });

  useEffect(() => {
    console.log("planData", planData);
    console.log("Edit clicked", editPlanId);
    const getEditPlan = async () => {
      try {
        const docRef = doc(db, "AdvertisementPlans", editPlanId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPlanData({ ...docSnap.data(), AdId: editPlanId });
          console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (editPlanId) {
      getEditPlan();
    }
  }, []);

  const handleChange = (e) => {
    setPlanData({
      ...planData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  const handleSave = async () => {
    try {
      const planId = editPlanId || uuid();
      const docRef = doc(db, "AdvertisementPlans", planId);
      planData.AdId = planId;
      await setDoc(docRef, planData);
      console.log("Plan added successfully with ID:", planId);
      window.location.reload();

      setPlanData({
        type: "",
        price: "",
        description: "",
        pricetype: "",
        duration: 1,
        title: "",
        feature: [],
        placement: "",
        AdId: "",
        custom: false,
      });
    } catch (error) {
      console.error("Error adding plan:", error.message);
    }
    setIsetIsFoamOpen(false);
    setAddfoam(false);
  };

  const handleFuturePointChange = (index, value) => {
    const newfeature = [...planData.feature];
    newfeature[index] = value;
    setPlanData({ ...planData, feature: newfeature });
  };

  const addFuturePoint = () => {
    setPlanData({ ...planData, feature: [...planData.feature, ""] });
  };

  const removeFuturePoint = (index) => {
    const newfeature = [...planData.feature];
    newfeature.splice(index, 1);
    setPlanData({ ...planData, feature: newfeature });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setPricesection(true);
  };
  const handleBack = () => {
    setPricesection(false);
  };

  return (
    <>
      <div className="container mx-auto mt-8">
        <div className="max-w-full">
          <div className="bg-white shadow-lg rounded-md p-8">
            <form onSubmit={handleNext}>
              <h2 className="text-2xl font-semibold mb-6">
                Add advartisment plan
              </h2>
              <div class="border-t border-gray-300 my-4"></div>
              {!priceSection && (
                <div>
                  <div className="mb-4">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Plan Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={planData.title}
                      placeholder="e.g. basic Premium"
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Plan type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={planData.type}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 w-full border rounded-md"
                    >
                      <option value="">Select advartisment type</option>
                      {advertisementType.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {planData.type === "Display ad" && (
                    <div className="mb-4">
                      <label
                        htmlFor="placement"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Ad placement
                      </label>
                      <select
                        id="placement"
                        name="placement"
                        value={planData.placement}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 w-full border rounded-md"
                      >
                        <option value="">Select placement area</option>
                        {placement.map((area, index) => (
                          <option key={index} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Course Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={planData.description}
                      onChange={handleChange}
                      required
                      rows="2"
                      className="mt-1 p-2 w-full border rounded-md"
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="futurePoints"
                      className="block text-sm font-medium text-gray-700"
                    >
                      feature
                    </label>
                    {planData.feature.map((feature, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) =>
                            handleFuturePointChange(index, e.target.value)
                          }
                          className="p-2 border rounded-md w-full mr-2 focus:outline-none focus:border-primary-600"
                        />
                        <button
                          type="button"
                          onClick={() => removeFuturePoint(index)}
                          className="text-red-500 hover:text-red-700 focus:outline-none"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addFuturePoint}
                      className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                      + Add Future Point
                    </button>
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={() => setIsetIsFoamOpen(false)}
                      className="bg-primary w-24 hover:bg-primary-600 text-white p-3 rounded-md focus:outline-none focus:shadow-outline-blue"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="bg-primary w-24 hover:bg-primary-600 text-white p-3 rounded-md focus:outline-none focus:shadow-outline-blue"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </form>
            <form onSubmit={handleSubmit}>
              {priceSection && (
                <div>
                  {/* price */}
                  <div className="mb-4">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={planData.price}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="pricetype"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Price Type
                    </label>
                    <select
                      id="pricetype"
                      name="pricetype"
                      value={planData.pricetype}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 w-full border rounded-md"
                    >
                      <option value="">Select price type</option>
                      {pricetype.map((pricetype, index) => (
                        <option key={index} value={pricetype}>
                          {pricetype}
                        </option>
                      ))}
                    </select>
                  </div>
                  {planData.pricetype === "defined no. of days" && (
                    <div className="mb-4">
                      <label
                        htmlFor="duration"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Display Duration (Days)
                      </label>
                      <input
                        type="number"
                        id="duration"
                        name="duration"
                        value={planData.duration}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                  )}

                  <div className="mt-6 text-end flex justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className=" bg-primary w-24 hover:bg-primary-600 text-white p-3 rounded-md focus:outline-none focus:shadow-outline-blue "
                    >
                      Prev
                    </button>
                    <button
                      type="submit"
                      className=" bg-primary w-24 hover:bg-primary-600 text-white p-3 rounded-md focus:outline-none focus:shadow-outline-blue "
                    >
                      submit
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
