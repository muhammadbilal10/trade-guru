import { React, useState } from "react";

import { setDoc, doc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import app from "../../../database/firebase";
import { getFirestore, getDoc } from "firebase/firestore";
export default function Editfoam({setEditfoam,setIsetIsFoamOpen}) {
    const db = getFirestore(app);

    const advertisementType = ["Display ad", "Feature"];
    const placement = ["Home Page", "Course page", "both"];
    const pricetype = ["Per day", "defined no. of days"];
    const [priceSection, setPricesection] = useState(false);

   
    const [planData, setPlanData] = useState({
      type: "",
      price: "",
      description:"",
      pricetype: "",
      duration: "",
      title: "",
      feature:[],
      placement: "",
      AdId: "",
      custom: false,
    });

    
    const handleChange = (e) => {
        setPlanData({
            ...planData,
            [e.target.name]: e.target.value,
        });
    };

    
   
    const handleSubmit = (e) => {
        e.preventDefault();
    
       
      };

    const handleSave = async () => {
        try {
            const planId = uuid();
            const docRef = doc(db, 'AdvertisementPlans', planId);
            planData.AdId = planId;
            await setDoc(docRef, planData);
            console.log('Plan added successfully with ID:', planId);
        
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
          console.error('Error adding plan:', error.message);
        }
        setIsEditClicked(false);
        setAddfoma(false);
      };



    const handleFuturePointChange = (index, value) => {
        const newfeature = [...planData.feature];
        newfeature[index] = value;
        setPlanData({ ...planData, feature: newfeature });
    };

    const addFuturePoint = () => {
        setPlanData({ ...planData, feature: [...planData.feature, ''] });
    };

    const removeFuturePoint = (index) => {
        const newfeature = [...planData.feature];
        newfeature.splice(index, 1);
        setPlanData({ ...planData, feature: newfeature });
    };



    const handleNext = () => {
        setPricesection(true);
    };
    return (
        <>
            <div className="container mx-auto mt-8">
                <div className="max-w-full"
                onSubmit={(e) => e.preventDefault()}>
                    {/* <form    onSubmit={(e) => e.preventDefault()}> */}
                        <div className="bg-white shadow-lg rounded-md p-8">
                            <h2 className="text-2xl font-semibold mb-6">Add advartisment plan</h2>
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


                                    {planData.type === 'Display ad' && (
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
                                            rows="2"
                                            className="mt-1 p-2 w-full border rounded-md"
                                        ></textarea>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="futurePoints" className="block text-sm font-medium text-gray-700">
                                            feature
                                        </label>
                                        {planData.feature.map((feature, index) => (
                                            <div key={index} className="flex items-center mb-2">
                                                <input
                                                    type="text"
                                                    value={feature}
                                                    onChange={(e) => handleFuturePointChange(index, e.target.value)}
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
                                            className="bg-primary w-24 hover:bg-primary-600 text-white p-3 rounded-md focus:outline-none focus:shadow-outline-blue"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            // type="submit"
                                            className="bg-primary w-24 hover:bg-primary-600 text-white p-3 rounded-md focus:outline-none focus:shadow-outline-blue"
                                            onClick={handleNext}
                                        >
                                            Next
                                        </button>

                                    </div>


                                </div>
                            )}
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
                                    {planData.pricetype === 'defined no. of days' && (
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

                                    <div className="flex justify-between mt-6">
                                        <button
                                          
                                            className="bg-primary w-24 hover:bg-primary-600 text-white p-3 rounded-md focus:outline-none focus:shadow-outline-blue"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            className="bg-primary w-24 hover:bg-primary-600 text-white p-3 rounded-md focus:outline-none focus:shadow-outline-blue"
                                            onClick={handleSave}
                                        >
                                            Save
                                        </button>

                                    </div>
                                </div>
                            )}

                        </div>
                    {/* </form> */}
                </div >
            </div >

        </>
    );
}

