import { React, useState, useEffect } from 'react';
import Optionbar from "./optionbar";
import Navbar from "../navbar/navbar";
import app from '../../database/firebase';
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import Cookies from 'universal-cookie';
import { LineChart, Line, XAxis, YAxis, PieChart, Pie, Tooltip, Legend , Cell} from 'recharts';
import { getprice, getchange, getSectorBySymbol, Is_symbol_exist,fetchStocks } from './apiFuntion/api_funtion';
import TradeBar from './MakeTrade/MakeTradeBar';

export default function OverviewPage() {
  
  const cookies = new Cookies();
  const [todayGainLoss, setTodaygain] = useState(0);
  const [netWorth, setNetworth] = useState(0);
  const [totalCash, setTotalcash] = useState(0);
  const [totalGainLoss, setTotalgain] = useState(0);
  const [walletData, setWalletData] = useState(null);
  const [userId, setUserId] = useState(cookies.get('userId'));
  // Define an array of colors
const colors = ['	#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#d0ed57','#0000FF', '#FFFF00', '#FF00FF', '#d0ed57'];

  const db = getFirestore(app);



  const [stockHoldings, setStockHoldings] = useState([]);

  const getWalletData = async () => {
    try {
      const userDocRef = doc(db, 'portfolio', userId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const data = userDocSnap.data().wallet;
        return data;
      } else {
        console.log('User document does not exist.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching wallet data:', error.message);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWalletData(userId);
        if (data) {
          setNetworth(data.net_worth);
          setTotalcash(data.cash_in_hand);
          setTotalgain(data.total_gain_loss);
        } else {
          setNetworth(0);
          setTotalcash(0);
          setTotalgain(0);
        }
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };

    const fetchStockHoldings = async () => {
      try {
        // Fetch user portfolio document
        const userDocRef = doc(db, 'portfolio', userId);
        const userDocSnap = await getDoc(userDocRef);

        // Get stock holdings data from the document
        const stockHoldingsData = userDocSnap.data().stockHoldings;

        console.log(stockHoldingsData);
        const transformedData = Object.keys(stockHoldingsData).map(symbol => ({
          name: symbol, // Use the symbol as the name
          value: stockHoldingsData[symbol].quantity, // Use the totalQuantity as the value
        }));
        setStockHoldings(transformedData);
      } catch (error) {
        console.error('Error fetching stock holdings:', error);
      }
    };


    fetchStockHoldings();

    fetchData();
  }, []);

  const lineChartData = [
    { name: 'Day 1', value: 100 },
    { name: 'Day 2', value: 120 },
    { name: 'Day 3', value: 90 },
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
                <h2>Stock Holdings</h2>
                <PieChart width={400} height={300}>
                  <Pie dataKey="value" data={stockHoldings} label>
                    {stockHoldings.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
                {/* <PieChart width={730} height={250}>
                  <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                  <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                </PieChart> */}
              </section>
            </div>
          </div>

          <TradeBar />

        </div>
      </div>
    </>



  );
};
