import React, { useState, useEffect } from 'react';
import Navbar from "../navbar/navbar";
import Optionbar from "./optionbar";
import app from '../../database/firebase';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from 'firebase/firestore';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import { getprice, getchange, getSectorBySymbol, Is_symbol_exist } from './apiFuntion/api_funtion';

export default function Positions_page() {
  const [chnage_value, setValue] = useState(0);
  const [stockData, setStockData] = useState([]);
  const [processedSymbols, setProcessedSymbols] = useState(new Set());
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [stockHoldings, setStockHoldings] = useState([]);

  const [userId, setUserId] = useState('RvITOTp9JrsehfH8iGcq');
  //const [userId, setUserId] = useState('QnX0VHVG9AQXldtoyV2PgTmvW422');
  const db = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDocRef = doc(db, "portfolio", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setStockHoldings(userDocSnap.data().stockHoldings || []);

        } else {
          console.error('User document not found');
        }
      } catch (error) {
        console.error('Error fetching user portfolio data:', error.message);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <>
      <div className="h-screen flex flex-col">
        <Navbar />
        <Optionbar />
        <div className="flex-1 overflow-hidden rounded-lg shadow-xs mt-4">
          <div className="w-full overflow-x-auto">
            <table className="w-full bg-white divide-y ">
              <thead className="bg-gray-200">
                <tr className="text-sm font-semibold tracking-wide text-left text-gray-700 uppercase border-b border-gray-300">
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Symbol</th>
                  <th className="px-6 py-3">Shares</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Daily Change</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(stockHoldings).map(([symbol, holding], index) => (
                  <tr className="text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" key={index}>
                    <td className="px-6 py-4">{index}</td>
                    <td className="px-6 py-4">{symbol}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 font-semibold leading-tight rounded-full ${holding.totalQuantity > 10 ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
                        {holding.totalQuantity}
                      </span>
                    </td>
                    <td className="px-6 py-4">{holding.averagePrice}</td>
                    {/* Add more columns for other data if needed */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};






// <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t bg-gray-50 sm:grid-cols-9">
//   <span class="flex items-center col-span-3">Showing 21-30 of 100</span>
//   <span class="col-span-2"></span>
//   {/* <!-- Pagination --> */}
//   <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
//     <nav aria-label="Table navigation">
//       <ul class="inline-flex items-center">
//         <li>
//           <button class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple" aria-label="Previous">
//             <svg aria-hidden="true" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
//               <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path>
//             </svg>
//           </button>
//         </li>
//         <li>
//           <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">1</button>
//         </li>
//         <li>
//           <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">2</button>
//         </li>
//         <li>
//           <button class="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple">3</button>
//         </li>
//         <li>
//           <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">4</button>
//         </li>
//         <li>
//           <span class="px-3 py-1">...</span>
//         </li>
//         <li>
//           <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">8</button>
//         </li>
//         <li>
//           <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">9</button>
//         </li>
//         <li>
//           <button class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple" aria-label="Next">
//             <svg class="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
//               <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path>
//             </svg>
//           </button>
//         </li>
//       </ul>
//     </nav>
//   </span>
// </div>



// <div class="bg-slate-100 flex flex-col">
// <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
//   <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
//     <div class="overflow-hidden">
//       <table class="min-w-full text-left text-sm font-light">
//         <thead class="border-b bg-purple-600 font-medium text-white dark:border-neutral-500">
//           <tr>
//             {/* asset share price current price dy chag  */}
//             <th scope="col" class="px-6 py-4">#</th>
//             <th scope="col" class="px-6 py-4">Symbol</th>
//             <th scope="col" class="px-6 py-4">Shares</th>
//             <th scope="col" class="px-6 py-4">Price</th>
//             <th scope="col" class="px-6 py-4">Daily Change</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map((transaction, index) => (
//             <tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={index}>
//               <td class="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
//               <td class="whitespace-nowrap px-6 py-4">{transaction.symbol}</td>
//               <td class="whitespace-nowrap px-6 py-4">{transaction.quantity}</td>
//               <td class="whitespace-nowrap px-6 py-4">{transaction.price}</td>
//               <td class="whitespace-nowrap px-6 py-4">{processedSymbols[transaction.symbol] !== undefined ? transaction.dailyChange : 'Loading...'}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// </div>
// </div>