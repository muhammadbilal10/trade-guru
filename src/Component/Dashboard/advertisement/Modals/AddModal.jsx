import { React, useState } from 'react';
import { Dialog } from '@headlessui/react'
import Cookies from 'universal-cookie';
import app from '../../../../database/firebase';
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { FaLandmark } from 'react-icons/fa';

export default function AddModal({ isOpen, setIsOpen }) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    duration:'',
    briefDescription: '',
    placement:'',
    Points: ['']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFuturePointChange = (index, value) => {
    const newPoints = [...formData.Points];
    newPoints[index] = value;
    setFormData({ ...formData, Points: newFuturePoints });
  };

  const addFuturePoint = () => {
    setFormData({ ...formData, Points: [...formData.Points, ''] });
  };

  const removeFuturePoint = (index) => {
    const newPoints = [...formData.Points];
    newPoints.splice(index, 1);
    setFormData({ ...formData, Points: newPoints });
  };

  const handleConfirm = async () => {
    // Implement your confirmation logic here
  };

  const handleCancel = () => {
    setIsOpen(false);
  };
  
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
    <Dialog.Panel className="fixed inset-0 flex items-center justify-center overflow-auto">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-xl w-full">
        <h2 className="text-lg font-semibold mb-4">Add Advertisement Plan</h2>
        
        {/* Input fields */}
        <div className="mb-4">
          <label htmlFor="advertiserName" className="block text-sm font-medium text-gray-700">
            Advertiser Name
          </label>
          <input
            type="text"
            name="advertiserName"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-primary-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.briefDescription}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-primary-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-primary-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-primary-600"
          />
        </div>
  
        {/* Future Points */}
        <div className="mb-4">
          <label htmlFor="futurePoints" className="block text-sm font-medium text-gray-700">
            Future Points
          </label>
          {formData.Points.map((point, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={point}
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
  
        {/* Buttons */}
        <div className="flex justify-end mt-6">
          <button 
            type="button" 
            className="mr-4 px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 focus:outline-none"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </Dialog.Panel>
  </Dialog>
  
  );
}



  // const [formData, setFormData] = useState({
  //   advertiserName: '',
  //   adType: '',
  //   imageURL: '',
  //   adLink: '',
  //   startDate: '',
  //   endDate: '',
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // Add your submission logic here
  //   console.log(formData);
  //   // Reset form data
  //   setFormData({
  //     advertiserName: '',
  //     adType: '',
  //     imageURL: '',
  //     adLink: '',
  //     startDate: '',
  //     endDate: '',
  //   });
   
  // };

