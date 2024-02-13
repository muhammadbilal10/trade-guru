import React, { useState, useEffect } from 'react';
import Navbar from "../navbar/navbar";
import Optionbar from "./optionbar";
import app from '../../database/firebase';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from 'firebase/firestore';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const Positions_page = () => {

  const [chnage_value, setValue] = useState(0);
  const getchange = async (symbol) => {
    const response = await fetch(`http://127.0.0.1:8000/current_price_change/${symbol}`);
    const data = await response.json();
    return data
  };


  const [stockData, setStockData] = useState([]);
  const [processedSymbols, setProcessedSymbols] = useState(new Set());


  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');

  const getprice = async (symbol) => {
    const response = await fetch(`http://127.0.0.1:8000/current_price/${symbol}`);
    const data = await response.json();
    return data;

  };
  // const [userId, setUserId] = useState('RvITOTp9JrsehfH8iGcq');
  const [userId, setUserId] = useState('QnX0VHVG9AQXldtoyV2PgTmvW422');
  const db = getFirestore(app);
  const [transactions, setTransactions] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userDocRef = doc(db, "portfolio", userId);
  //       const userDocSnap = await getDoc(userDocRef);

  //       if (userDocSnap.exists()) {
  //         setTransactions(userDocSnap.data().transactions || []);

  //       } else {
  //         console.error('User document not found');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user portfolio data:', error.message);
  //     }
  //   };

  //   fetchData();
  // }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDocRef = doc(db, "portfolio", userId);
        const userDocSnap = await getDoc(userDocRef);
  
        if (userDocSnap.exists()) {
          const transactions = userDocSnap.data().transactions || [];
          setTransactions(transactions);
  
          // Filter out symbols that have already been processed
          const uniqueSymbols = new Set(transactions.map(transaction => transaction.symbol));
          const unprocessedSymbols = [...uniqueSymbols].filter(symbol => !processedSymbols.has(symbol));
  
          // Fetch daily change for each unique symbol
          const changeDataPromises = unprocessedSymbols.map(async symbol => {
            const dailyChange = await getchange(symbol);
            return { symbol, dailyChange };
          });
  
          // Wait for all promises to resolve
          const changeData = await Promise.all(changeDataPromises);
  
          // Update processedSymbols
          setProcessedSymbols(new Set([...processedSymbols, ...unprocessedSymbols]));
  
          console.log("Daily change data:", changeData);
        } else {
          console.error('User document not found');
        }
      } catch (error) {
        console.error('Error fetching user portfolio data:', error.message);
      }
    };
  
    fetchData();
  }, [userId, processedSymbols]);
  

  return (
    <>

      <Navbar />
      <Optionbar />

      <div class="bg-slate-100 flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-left text-sm font-light">
                <thead class="border-b bg-purple-600 font-medium text-white  dark:border-neutral-500">
                  <tr>
                    {/* asset share price current price dy chag  */}
                    <th scope="col" class="px-6 py-4">#</th>
                    <th scope="col" class="px-6 py-4">Symbol</th>
                    <th scope="col" class="px-6 py-4">shares</th>
                    <th scope="col" class="px-6 py-4">price</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr
                      class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                      key={index}>
                      <td class="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                      <td class="whitespace-nowrap px-6 py-4">{transaction.symbol}</td>
                      <td class="whitespace-nowrap px-6 py-4">{transaction.quantity}</td>
                      <td class="whitespace-nowrap px-6 py-4">{transaction.price}</td>
                    </tr>
                  ))}
                  {/* <tr
                    class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                    <td class="whitespace-nowrap px-6 py-4 font-medium">1</td>
                    <td class="whitespace-nowrap px-6 py-4">Mark</td>
                    <td class="whitespace-nowrap px-6 py-4">Otto</td>
                    <td class="whitespace-nowrap px-6 py-4">@mdo</td>
                  </tr>
                  <tr
                    class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                    <td class="whitespace-nowrap px-6 py-4 font-medium">2</td>
                    <td class="whitespace-nowrap px-6 py-4">Jacob</td>
                    <td class="whitespace-nowrap px-6 py-4">Thornton</td>
                    <td class="whitespace-nowrap px-6 py-4">@fat</td>
                  </tr>
                  <tr
                    class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                    <td class="whitespace-nowrap px-6 py-4 font-medium">3</td>
                    <td class="whitespace-nowrap px-6 py-4">Larry</td>
                    <td class="whitespace-nowrap px-6 py-4">Wild</td>
                    <td class="whitespace-nowrap px-6 py-4">@twitter</td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>






      <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-x-auto">
          <table class="w-full whitespace-no-wrap">
            <thead>
              <tr
                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
              >
                <th class="px-4 py-3">#</th>
                <th class="px-4 py-3">symbol</th>
                <th class="px-4 py-3">share</th>
                <th class="px-4 py-3">price</th>
                <th class="px-4 py-3">daily change</th>
                <th class="px-4 py-3">price</th>
              </tr>
            </thead>
            <tbody
              class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
            >
              {transactions.map((transaction, index) => (
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
                        <p class="font-semibold">{index + 1}</p>
                        <p class="text-xs text-gray-600 dark:text-gray-400">
                          {/* {instructor.occupation} */}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm">
                    {transaction.symbol}
                  </td>
                  <td class="px-4 py-3 text-xs">
                    <span
                      className={`px-2 py-1 font-semibold leading-tight rounded-full ${transaction.quantity < 10
                        ? 'text-green-700 bg-green-100'
                        : 'text-red-700 bg-red-100 '
                        }`}
                    >
                      {transaction.quantity}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm">
                    {transaction.price}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {processedSymbols[transaction.symbol] !== undefined ? transaction.dailyChange : 'Loading...'}
                  </td>


                </tr>

              ))}
            </tbody>
          </table>
        </div>
        <div
          class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t  bg-gray-50 sm:grid-cols-9  "
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
                      aria-hidden="true"
                      class="w-4 h-4 fill-current"
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
                    class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                  >
                    4
                  </button>
                </li>
                <li>
                  <span class="px-3 py-1">...</span>
                </li>
                <li>
                  <button
                    class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                  >
                    8
                  </button>
                </li>
                <li>
                  <button
                    class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                  >
                    9
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
      </div>



    </>

  );
};






export default Positions_page;




{/* <section class="w-2/12 bg-blue-300 overflow-y-auto flex flex-col justify-end">
        <button class="p-2 bg-green-500">BUY</button>
        <button class="p-2 bg-red-700">SELL</button>
        <button class="p-2 bg-orange-500">SHORT</button>
      </section> */}