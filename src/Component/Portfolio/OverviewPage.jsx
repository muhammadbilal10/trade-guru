import { React, useState, useEffect } from 'react';
import Optionbar from "./optionbar";
import Navbar from "../navbar/navbar";
import app from '../../database/firebase';
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { LineChart, Line, XAxis, YAxis, PieChart, Pie, Tooltip, Legend } from 'recharts';
// import { getprice, getchange, getSectorBySymbol, Is_symbol_exist } from './apiFuntion/api_funtion';
import TradeBar from './MakeTradeBar';

export default function OverviewPage() {
  //to be used 
  const [todayGainLoss, setTodaygain] = useState(250000);
  const [netWorth, setNetworth] = useState(1025459);
  const [totalCash, setTotalcash] = useState(500000);
  const [totalGainLoss, setTotalgain] = useState(789542);

  const [userId, setUserId] = useState('RvITOTp9JrsehfH8iGcq');
  //const [userId, setUserId] = useState('QnX0VHVG9AQXldtoyV2PgTmvW422');



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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Optionbar />
        <div className="flex flex-row flex-1">
          <div className="w-10/12 bg-gray-100 overflow-y-auto">
            <nav className="w-full bg-gray-200 h-16 p-4 flex justify-between items-center">
              {/* Net Worth and Today's Gain/Loss */}
              <div className="flex justify-center items-center space-x-4 flex-grow">
                <div className="rounded-lg bg-white p-2 shadow-md">
                  <p className="text-gray-800 font-semibold">Net Worth: {netWorth}</p>
                </div>
                <div className={`rounded-lg bg-white p-2 shadow-md text-${todayGainLoss >= 0 ? 'green-600' : 'red-600'}`}>
                  <p className="font-semibold">Today's Gain/Loss: {todayGainLoss}</p>
                </div>
              </div>
              {/* Total Cash and Total Gain/Loss */}
              <div className="flex justify-center items-center space-x-4 flex-grow">
                <div className="rounded-lg bg-white p-2 shadow-md">
                  <p className="text-gray-800 font-semibold">Total Cash: {totalCash}</p>
                </div>
                <div className={`rounded-lg bg-white p-2 shadow-md text-${totalGainLoss >= 0 ? 'green-600' : 'red-600'}`}>
                  <p className="font-semibold">Total Gain/Loss: {totalGainLoss}</p>
                </div>
              </div>
            </nav>

            {/* Charts Section */}
            <div className="flex flex-row flex-wrap mt-5">
              <section className="w-full md:w-6/12 lg:w-6/12 h-[300px] border border-gray-400 rounded-lg mb-4 md:mb-0">
                <LineChart width={400} height={300} data={lineChartData}>
                  <XAxis dataKey="date" />
                  <YAxis type="number" domain={['auto', 'auto']} tickFormatter={(value) => `$${value}`} />
                  <Line type="monotone" dataKey="value" stroke="#FFD700" strokeWidth={2} dot={{ fill: '#FFD700' }} />
                  <Tooltip />
                </LineChart>
              </section>
              <section className="w-full md:w-6/12 lg:w-6/12 h-[300px] border border-gray-400 rounded-lg">
                <PieChart width={400} height={300}>
                  <Pie dataKey="value" data={pieChartData} fill="#FFA500" label />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </section>
            </div>
          </div>

          <TradeBar/>
          
        </div>
      </div>
    </>



  );
};
