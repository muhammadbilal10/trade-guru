import { React, useState, useEffect } from 'react';
import Optionbar from "./optionbar";
import Navbar from "../navbar/navbar";
import app from '../../database/firebase';
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { LineChart, Line, XAxis, YAxis, PieChart, Pie, Tooltip, Legend } from 'recharts';


const Trade = () => {
  const [symbol, setSymbol] = useState('HBL');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [change_percent, setPercent] = useState(0);
  const [change_value, setValue] = useState(0);
  const [symbols, setSymbols] = useState([]);

  const [todayGainLoss, setTodaygain] = useState(250000);
  const [netWorth, setNetworth] = useState(1025459);
  const [totalCash, setTotalcash] = useState(500000);
  const [totalGainLoss, setTotalgain] = useState(789542);

  // const [userId, setUserId] = useState('RvITOTp9JrsehfH8iGcq');
  const [userId, setUserId] = useState('QnX0VHVG9AQXldtoyV2PgTmvW422');


  const db = getFirestore(app);

  const getprice = async (symbol) => {
    const response = await fetch(`http://127.0.0.1:8000/current_price/${symbol}`);
    const data = await response.json();
    return data;
  };

  const getchange = async (symbol) => {
    const response = await fetch(`http://127.0.0.1:8000/current_price_change/${symbol}`);
    const data = await response.json();
    return data
  };



  // const handleBuy = async () => {
  //   try {
  //     const userDocRef = doc(db, "portfolio", userId);
  //     // Check if the user document exists
  //     const userDocSnap = await getDoc(userDocRef);

  //     if (!userDocSnap.exists()) {
  //       // If the user document doesn't exist, create a new document with the provided user ID
  //       await setDoc(userDocRef, { transactions: [] });
  //     }
  //     const change = await getchange(symbol.toUpperCase());
  //     console.log(change);
  //     setPercent(change[2]);
  //     setValue(change[1]);
  //     setPrice(change[0]);
  //     console.log(price);
  //     // const currentDate = new Date();
  //     // console.log(currentDate);
  //     const newTransaction = {

  //       symbol: symbol.toUpperCase(),
  //       quantity: quantity,
  //       price: change[0],
  //       // date: date,
  //     };
  //     // Add the new transaction to the existing or newly created transactions array
  //     if (userDocSnap.exists()) {
  //       // If the document exists, update it by adding the new transaction to the 'transactions' array
  //       await updateDoc(userDocRef, {
  //         transactions: [...userDocSnap.data().transactions, newTransaction]
  //       });
  //     } else {
  //       // If the document didn't exist and has just been created, set the 'transactions' array with the new transaction
  //       await setDoc(userDocRef, { transactions: [newTransaction] });
  //     }
  //     console.log('Transaction added successfully to user portfolio:', userId);
  //   } catch (error) {
  //     console.error('Error adding transaction:', error.message);
  //   }
  // };




  // const handleBuy = async () => {
  //   try {
  //     // Retrieve the user document reference
  //     const userDocRef = doc(db, "portfolio", userId);
  //     // Retrieve the user document snapshot
  //     const userDocSnap = await getDoc(userDocRef);

  //     if (!userDocSnap.exists()) {
  //       // If the user document doesn't exist, create a new document with the provided user ID
  //       await setDoc(userDocRef, {
  //         transactions: [],
  //         wallet: {
  //           currency: "INR",
  //           balance: 100000, // Initial balance of 100k rupees
  //           cash_in_hand: 100000, // Initial cash in hand
  //           net_worth: 100000, // Initial net worth
  //           total_gain_loss: 0 // Initial total gain/loss
  //         }
  //       });
  //     }

  //     // Fetch the latest stock price and calculate total price
  //     const change = await getchange(symbol.toUpperCase());
  //     // const price = change[0];
  //     const totalPrice = change[0] * quantity;
  //     console.log(change);
  //     setPercent(change[2]);
  //     setValue(change[1]);
  //     setPrice(change[0]);
  //     console.log(price);



  //     // Retrieve user's wallet data
  //     const userWallet = userDocSnap.data().wallet;

  //     // Check if user has sufficient cash in hand to make the purchase
  //     if (totalPrice > userWallet.cash_in_hand) {
  //       throw new Error("Insufficient funds in cash_in_hand");
  //     }

  //     // Create the new transaction object
  //     const newTransaction = {
  //       symbol: symbol.toUpperCase(),
  //       quantity: quantity,
  //       price: change[0],
  //       totalPrice: totalPrice,
  //       date: new Date().toISOString()
  //     };

  //     // Add the new transaction to the existing or newly created transactions array
  //     if (userDocSnap.exists()) {
  //       // If the document exists, update it by adding the new transaction to the 'transactions' array
  //       await updateDoc(userDocRef, {
  //         transactions: [...userDocSnap.data().transactions, newTransaction]
  //       });

  //       // Update cash_in_hand and net_worth in user's wallet
  //       const updatedCashInHand = userWallet.cash_in_hand - totalPrice;
  //       const updatedNetWorth = userWallet.net_worth - userWallet.cash_in_hand + updatedCashInHand;

  //       await updateDoc(userDocRef, {
  //         "wallet.cash_in_hand": updatedCashInHand,
  //         "wallet.net_worth": updatedNetWorth
  //       });

  //     } else {
  //       // If the user document didn't exist and has just been created, set the 'transactions' array with the new transaction
  //       await setDoc(userDocRef, {
  //         transactions: [newTransaction],
  //         wallet: {
  //           currency: "INR",
  //           balance: 100000, // Initial balance of 100k rupees
  //           cash_in_hand: 100000 - totalPrice, // Subtract the purchase price from initial balance
  //           net_worth: 100000, // Initial net worth
  //           total_gain_loss: 0 // Initial total gain/loss
  //         }
  //       });
  //     }

  //     console.log('Transaction added successfully to user portfolio:', userId);

  //   } catch (error) {
  //     console.error("Error adding transaction:", error.message);
  //   }
  // };


  const handleBuy = async () => {
    try {
      // Retrieve the user document reference
      const userDocRef = doc(db, "portfolio", userId);
      // Retrieve the user document snapshot
      const userDocSnap = await getDoc(userDocRef);
  
      // Fetch the latest stock price and calculate total price
      const change = await getchange(symbol.toUpperCase());
      const price = change[0];
      const totalPrice = price * quantity;
  
      console.log(change);
      setPercent(change[2]);
      setValue(change[1]);
      setPrice(change[0]);
      console.log(price);
  
      // Check if user document snapshot exists
      if (userDocSnap.exists()) {
        // Retrieve user's wallet data
        const userWallet = userDocSnap.data().wallet;
  
        // Check if user has sufficient cash in hand to make the purchase
        if (totalPrice > userWallet.cash_in_hand) {
          throw new Error("Insufficient funds in cash_in_hand");
        }
  
        // Create the new transaction object
        const newTransaction = {
          symbol: symbol.toUpperCase(),
          quantity: quantity,
          price: price,
          totalPrice: totalPrice,
          date: new Date().toISOString()
        };
  
        // Add the new transaction to the existing transactions array
        await updateDoc(userDocRef, {
          transactions: [...(userDocSnap.data().transactions || []), newTransaction],
          "wallet.cash_in_hand": userWallet.cash_in_hand - totalPrice,
          "wallet.net_worth": userWallet.net_worth - userWallet.cash_in_hand + (userWallet.cash_in_hand - totalPrice)
        });
  
      } else {
        // If the user document doesn't exist, create a new document with the provided user ID
        await setDoc(userDocRef, {
          transactions: [{
            symbol: symbol.toUpperCase(),
            quantity: quantity,
            price: price,
            totalPrice: totalPrice,
            date: new Date().toISOString()
          }],
          wallet: {
            currency: "INR",
            balance: 100000, // Initial balance of 100k rupees
            cash_in_hand: 100000 - totalPrice, // Subtract the purchase price from initial balance
            net_worth: 100000, // Initial net worth
            total_gain_loss: 0 // Initial total gain/loss
          }
        });
      }
  
      console.log('Transaction added successfully to user portfolio:', userId);
  
    } catch (error) {
      console.error("Error adding transaction:", error.message);
    }
  };
  
  

  useEffect(() => {
    const fetch_symbol = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/get_symbol');
        if (!response.ok) {
          throw new Error('Failed to fetch symbols');
        }
        const data = await response.json();
        setSymbols(data);
      } catch (error) {
        console.error('Error fetching symbols:', error.message);
      }
    };

    const temp = async () => {
      const change = await getchange(symbol.toUpperCase());
      console.log(change);
      setPercent(change[2]);
      setValue(change[1]);
      setPrice(change[0]);
      console.log(price);
    }

    fetch_symbol();
    temp();
  }, [1]);




  const lineChartData = [
    { name: 'Day 1', value: 100 },
    { name: 'Day 2', value: 120 },
    { name: 'Day 3', value: 90 },
    // Add more data points as needed
  ];

  const pieChartData = [
    { name: 'Stock A', value: 200 },
    { name: 'Stock B', value: 300 },
    { name: 'Stock C', value: 150 },
    // Add more data points as needed
  ];

  return (
    <>
      <div className="max-h-screen flex flex-col w-full h-screen">
        <Navbar />
        <Optionbar />
        <div className="flex flex-row flex-1">
          <div className="w-10/12 bg-gray-100 overflow-y-auto">
            <nav className="w-full bg-gray-200 h-16 p-4 flex justify-between items-center">
              <div className="flex justify-center items-center space-x-4 flex-grow">
                <div className="rounded-lg bg-white p-2 shadow-md">
                  <p className="text-gray-800 font-semibold">Net Worth: {netWorth}</p>
                </div>
                <div className={`rounded-lg bg-white p-2 shadow-md text-${todayGainLoss >= 0 ? 'green-600' : 'red-600'}`}>
                  <p className="font-semibold">Today's Gain/Loss: {todayGainLoss}</p>
                </div>
              </div>
              <div className="flex justify-center items-center space-x-4 flex-grow">
                <div className="rounded-lg bg-white p-2 shadow-md">
                  <p className="text-gray-800 font-semibold">Total Cash: {totalCash}</p>
                </div>
                <div className={`rounded-lg bg-white p-2 shadow-md text-${totalGainLoss >= 0 ? 'green-600' : 'red-600'}`}>
                  <p className="font-semibold">Total Gain/Loss: {totalGainLoss}</p>
                </div>
              </div>
            </nav>

            <div className="flex flex-row mt-5">
              <section className="w-6/12 h-[300px] border border-gray-400 rounded-lg">
                <LineChart width={400} height={300} data={lineChartData}>
                  <XAxis dataKey="date" />
                  <YAxis type="number" domain={['auto', 'auto']} tickFormatter={(value) => `$${value}`} />
                  <Line type="monotone" dataKey="value" stroke="#FFD700" strokeWidth={2} dot={{ fill: '#FFD700' }} />
                  <Tooltip />
                </LineChart>
              </section>
              <section className="w-6/12 h-[300px] border border-gray-400 rounded-lg">
                <PieChart width={400} height={300}>
                  <Pie dataKey="value" data={pieChartData} fill="#FFA500" label />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </section>
            </div>
          </div>

          <div className="w-2/12 bg-gray-100 overflow-y-auto flex flex-col justify-between p-4 rounded">
            <input className="p-2 bg-gray-200 mb-4 border border-gray-300 rounded"
              type="text"
              placeholder="Symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)} />

            <input className="p-2 bg-gray-200 mb-4 border border-gray-300 rounded"
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)} />

            <div className="bg-gray-200 p-4 rounded">
              <p className="text-gray-700 font-semibold">Price: $ {price}</p>
              <p className={`text-gray-700 ${change_percent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                Change (%): {change_percent}
              </p>
              <p className={`text-gray-700 ${change_value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                Change (Rs.): {change_value}
              </p>
            </div>

            <div className="flex flex-col justify-end space-y-2">
              <button className="p-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleBuy}>
                BUY
              </button>
              <button className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">SELL</button>
              <button className="p-2 bg-orange-500 text-white rounded hover:bg-orange-600">SHORT</button>
            </div>
          </div>
        </div>
      </div>
    </>



  );
};

export default Trade;






// <div class="w-2/12 bg-purple-600 overflow-y-auto flex flex-col justify-end">

// <input class="p-2 bg-white"
//   type="text"
//   placeholder="Symbol"
//   value={symbol}
//   onChange={(e) => setSymbol(e.target.value)} />

// <input class="p-2 bg-white"
//   type="number"
//   placeholder="Quantity"
//   value={quantity}
//   onChange={(e) => setQuantity(e.target.value)} />

// <button class="p-2 bg-gray-500">
//   Price: $ {price} <br />
//   Change (%): {chnage_percent} <br />
//   Change ($): {chnage_value}

// </button>
// <button class="p-2 bg-green-500"
//   onClick={handleBuy}>
//   BUY
// </button>
// <button class="p-2 bg-red-700">SELL</button>
// <button class="p-2 bg-orange-500">SHORT</button>
// </div>
// </div>