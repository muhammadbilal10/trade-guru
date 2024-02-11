import React, { useState, useEffect } from 'react';
import Navbar from "../navbar/navbar";
import Optionbar from "./optionbar";
import app from '../../database/firebase';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from 'firebase/firestore';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const Positions_page = () => {

  const data = [
    { symbol: 'AAPL', quantity: 10, purchase_price: 150, purchase_date: new Date() },
    { symbol: 'GOOGL', quantity: 5, purchase_price: 2800, purchase_date: new Date() }
  ];
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDocRef = doc(db, "portfolio", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setTransactions(userDocSnap.data().transactions || []);
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
                      <td class="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
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
      <section class="w-2/12 bg-blue-300 overflow-y-auto flex flex-col justify-end">
        <button class="p-2 bg-green-500">BUY</button>
        <button class="p-2 bg-red-700">SELL</button>
        <button class="p-2 bg-orange-500">SHORT</button>
      </section>



    </>

  );
};






export default Positions_page;
