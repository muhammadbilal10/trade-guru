import React, { useState } from 'react';
import Optionbar from "./optionbar";
import Navbar from "../navbar/navbar";
import app from '../../database/firebase';
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const Trade = () => {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  // const data = [
  //   { symbol: 'AAPL', quantity: 10, purchase_price: 150, purchase_date: new Date() },
  //   { symbol: 'GOOGL', quantity: 5, purchase_price: 2800, purchase_date: new Date() }
  // ];


  const getprice = async (symbol) => {
    const response = await fetch(`http://127.0.0.1:8000/current_price/${symbol}`);
    const data = await response.json();
    return data;
  };

  // const [userId, setUserId] = useState('RvITOTp9JrsehfH8iGcq');
  const [userId, setUserId] = useState('QnX0VHVG9AQXldtoyV2PgTmvW422');
  const db = getFirestore(app);

  const handleBuy = async () => {
    try {
      const userDocRef = doc(db, "portfolio", userId);

      // Check if the user document exists
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // If the user document doesn't exist, create a new document with the provided user ID
        await setDoc(userDocRef, { transactions: [] });
      }
      const price = await getprice(symbol);
      // const currentDate = new Date();
      // console.log(currentDate);
      const newTransaction = {
        symbol: symbol,
        quantity: quantity,
        // symbol: 'BOP',
        // quantity: 745,
        // date: date,
        price: price // Store the price directly
      };
      // Add the new transaction to the existing or newly created transactions array
      if (userDocSnap.exists()) {
        // If the document exists, update it by adding the new transaction to the 'transactions' array
        await updateDoc(userDocRef, {
          transactions: [...userDocSnap.data().transactions, newTransaction]
        });
      } else {
        // If the document didn't exist and has just been created, set the 'transactions' array with the new transaction
        await setDoc(userDocRef, { transactions: [newTransaction] });
      }

      console.log('Transaction added successfully to user portfolio:', userId);
    } catch (error) {
      console.error('Error adding transaction:', error.message);
    }
  };



  return (
    <>


      <div class="max-h-screen flex flex-col w-full h-screen">
        <Navbar />
        <Optionbar />

        {/* <nav class="w-full bg-blue-500 h-10">
          <p>Networth</p>
        </nav> */}


        <div class="flex flex-row flex-1">

          <div class="w-10/12 bg-grey overflow-y-auto">
            {/* <nav class="w-full bg-green-500 h-10">
              <p>Heat Map Futures</p>
            </nav> */}
            <nav class="w-full bg-grey-600 h-16 p-4">
              <div class="rounded-lg bg-violet-300 p-2">
                <p>Networth</p>
              </div>
            </nav>
            <div class="flex flex-row mt-5">
              <section class="w-6/12 h-[300px] border border-red-500 rounded-lg">
                <p>Portfolio Performance</p>
              </section>
              <section class="w-6/12 h-[300px] border border-red-500 rounded-lg">
                Portfolio Allocation
              </section>
            </div>
          </div>

          <div class="w-2/12 bg-purple-600 overflow-y-auto flex flex-col justify-end">

            <input class="p-2 bg-white"
              type="text"
              placeholder="Symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)} />

            <input class="p-2 bg-white"
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)} />

            <button class="p-2 bg-gray-500">price box</button>
            <button class="p-2 bg-green-500"
              onClick={handleBuy}>
              BUY
            </button>
            <button class="p-2 bg-red-700">SELL</button>
            <button class="p-2 bg-orange-500">SHORT</button>
          </div>
        </div>


      </div>



    </>
  );
};

export default Trade;
