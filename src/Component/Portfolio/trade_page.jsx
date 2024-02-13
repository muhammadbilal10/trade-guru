import { React, useState, useEffect } from 'react';
import Optionbar from "./optionbar";
import Navbar from "../navbar/navbar";
import app from '../../database/firebase';
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { LineChart, Line, XAxis, YAxis, PieChart, Pie, Tooltip, Legend } from 'recharts';


const Trade = () => {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState();
  const [change_percent, setPercent] = useState(0);
  const [change_value, setValue] = useState(0);


  const [todayGainLoss, setTodaygain] = useState(250000);
  const [netWorth, setNetworth] = useState(1025459);
  const [totalCash, setTotalcash] = useState(500000);
  const [totalGainLoss, setTotalgain] = useState(789542);





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
      const p = await getprice(symbol);
      setPrice(p)

      console.log(price)
      const change = await getchange(symbol);
      setPercent(change[0])
      setValue(change[1])
      // const currentDate = new Date();
      // console.log(currentDate);
      const newTransaction = {

        symbol: symbol,
        quantity: quantity,
        price: price,
        // date: date,
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

  const [symbols, setSymbols] = useState([]);
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

    fetch_symbol();
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
    // <>
    //   <div className="max-h-screen flex flex-col w-full h-screen">
    //     <Navbar />
    //     <Optionbar />
    //     <div className="flex flex-row flex-1">
    //       <div className="w-10/12 bg-gray-100 overflow-y-auto">
    //         <nav className="w-full bg-gray-200 h-16 p-4 flex justify-between items-center">
    //           <div className="flex justify-center items-center space-x-4 flex-grow">
    //             <div className="rounded-lg bg-white p-2 shadow-md">
    //               <p className="text-gray-800 font-semibold">Net Worth: {netWorth}</p>
    //             </div>
    //             <div className={`rounded-lg bg-white p-2 shadow-md text-${todayGainLoss >= 0 ? 'green-600' : 'red-600'}`}>
    //               <p className="font-semibold">Today's Gain/Loss: {todayGainLoss}</p>
    //             </div>
    //           </div>
    //           <div className="flex justify-center items-center space-x-4 flex-grow">
    //             <div className="rounded-lg bg-white p-2 shadow-md">
    //               <p className="text-gray-800 font-semibold">Total Cash: {totalCash}</p>
    //             </div>
    //             <div className={`rounded-lg bg-white p-2 shadow-md text-${totalGainLoss >= 0 ? 'green-600' : 'red-600'}`}>
    //               <p className="font-semibold">Total Gain/Loss: {totalGainLoss}</p>
    //             </div>
    //           </div>
    //         </nav>

    //         <div className="flex flex-row mt-5">
    //           <section className="w-6/12 h-[300px] border border-red-500 rounded-lg">
    //             <LineChart width={400} height={300} data={lineChartData}>
    //               <Line type="monotone" dataKey="value" stroke="#8884d8" />
    //               <Tooltip />
    //             </LineChart>
    //           </section>
    //           <section className="w-6/12 h-[300px] border border-red-500 rounded-lg">
    //             <PieChart width={400} height={300}>
    //               <Pie dataKey="value" data={pieChartData} fill="#8884d8" label />
    //               <Tooltip />
    //               <Legend />
    //             </PieChart>
    //           </section>
    //         </div>


    //       </div>

    //       <div className="w-2/12 bg-white overflow-y-auto flex flex-col justify-between p-4">
    //         <input className="p-2 bg-gray-200 mb-4"
    //           type="text"
    //           placeholder="Symbol"
    //           value={symbol}
    //           onChange={(e) => setSymbol(e.target.value)} />

    //         <input className="p-2 bg-gray-200 mb-4"
    //           type="number"
    //           placeholder="Quantity"
    //           value={quantity}
    //           onChange={(e) => setQuantity(e.target.value)} />

    //         <button className="p-2 bg-gray-400 text-gray-700 mb-4">
    //           Price: $ {price} <br />
    //           Change (%): {change_percent} <br />
    //           Change ($): {change_value}
    //         </button>

    //         <div className="flex flex-col flex-grow justify-end space-y-2">
    //           <button className="p-2 bg-green-500 text-white" onClick={handleBuy}>
    //             BUY
    //           </button>
    //           <button className="p-2 bg-yellow-500 text-white">SELL</button>
    //           <button className="p-2 bg-orange-500 text-white">SHORT</button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
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
              <p className="text-gray-700">Change (%): {change_percent}</p>
              <p className="text-gray-700">Change ($): {change_value}</p>
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