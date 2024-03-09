import { React, useState } from 'react';
import { Dialog } from '@headlessui/react'
import Cookies from 'universal-cookie';
import app from '../../../../database/firebase';
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { FaLandmark } from 'react-icons/fa';

export default function AddModal({ isOpen, setIsOpen }) {
  const cookies = new Cookies();
  const [userId, setUserId] = useState(cookies.get('userId'));
  const db = getFirestore(app);

  const handleConfirm = async () => {
    
  };

  const handleCancel = () => {
   
  };
  
  const [formData, setFormData] = useState({
    advertiserName: '',
    adType: '',
    imageURL: '',
    adLink: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your submission logic here
    console.log(formData);
    // Reset form data
    setFormData({
      advertiserName: '',
      adType: '',
      imageURL: '',
      adLink: '',
      startDate: '',
      endDate: '',
    });
   
  };
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}
    >
    <Dialog.Panel className="fixed inset-0 flex items-center justify-center overflow-auto">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">Add Advertisement Plan</h2>
        
          <div className="mb-4">
            <label htmlFor="advertiserName" className="block text-sm font-medium text-gray-700">
              Advertiser Name
            </label>
            <input
              type="text"
              id="advertiserName"
              name="advertiserName"
              value={formData.advertiserName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          {/* Add other input fields for adType, imageURL, adLink, startDate, endDate */}
          <div className="flex justify-end mt-6">
            <button type="button" className="mr-4 px-4 py-2 text-gray-600 hover:text-gray-800" >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Confirm
            </button>
          </div>
        
      </div>
    </Dialog.Panel>
  </Dialog>
  )
}







// <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
//           <div className="mb-4">
//             <label htmlFor="symbol" className="block mb-1">Symbol</label>
//             <input
//               id="symbol"
//               type="text"
//               className="block w-full px-3 py-2 border rounded focus:outline-none focus:border-purple-400"
//               value={symbol}
//               readOnly
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="quantity" className="block mb-1">Quantity</label>
//             <input
//               id="quantity"
//               type="number"
//               className="block w-full px-3 py-2 border rounded focus:outline-none focus:border-purple-400"
//               value={quantity}
//               readOnly
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="comment" className="block mb-1">Comment</label>
//             <textarea
//               id="comment"
//               className="block w-full px-3 py-2 border rounded focus:outline-none focus:border-purple-400"
//               rows="4"
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//             ></textarea>
//           </div>
//           <div className="flex justify-end mt-6">
//             <button
//               className="px-4 py-2 mr-2 text-white bg-green-600 rounded hover:bg-green-700"
//               onClick={handleConfirmBuy}
//             >
//               Confirm Buy
//             </button>
//             <button
//               className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
//               onClick={() => setIsOpen(false)}
//             >
//               Cancel
//             </button>
//           </div>
          
//         </div>