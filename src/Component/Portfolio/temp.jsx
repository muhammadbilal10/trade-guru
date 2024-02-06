import React, { useState, useEffect } from 'react';
import Navbar from "../navbar/navbar";
import Optionbar from "./optionbar";
import app from '../../database/firebase';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from 'firebase/firestore';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const Temp_page = () => {

  const data = [
    { symbol: 'AAPL', quantity: 10, purchase_price: 150, purchase_date: new Date() },
    { symbol: 'GOOGL', quantity: 5, purchase_price: 2800, purchase_date: new Date() }
  ];
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');


  const [userId, setUserId] = useState('RvITOTp9JrsehfH8iGcq');
  const db = getFirestore(app);

  const handlesubmit = async () => {
    try {
      const userDocRef = doc(db, "portfolio", userId);

      // Check if the user document exists
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // If the user document doesn't exist, create a new document with the provided user ID
        await setDoc(userDocRef, { transactions: [] });
      }

      const newTransaction = {
        symbol: 'syml',
        quantity: 745,
        // date: date,
        price: 5
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

      <Navbar />
      <Optionbar />
      <div>
        <h2>Add Stock to Portfolio</h2>
        <input
          type="text"
          placeholder="Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={handlesubmit}>Add Stock</button>
      </div>
      {/* <button onClick={handlesubmit}>click me to test database</button> */}


      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-left text-sm font-light">
                <thead class="border-b bg-purple-600 font-medium text-white  dark:border-neutral-500">
                  <tr>
                    <th scope="col" class="px-6 py-4">#</th>
                    <th scope="col" class="px-6 py-4">First</th>
                    <th scope="col" class="px-6 py-4">Last</th>
                    <th scope="col" class="px-6 py-4">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
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
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </>

  );
};






export default Temp_page;
