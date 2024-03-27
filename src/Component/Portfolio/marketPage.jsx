import { React, useState, useEffect } from 'react';
import Optionbar from "./optionbar";
import Navbar from "../navbar/navbar";
import app from '../../database/firebase';
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { LineChart, Line, XAxis, YAxis, PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import { getprice, getchange, getcandlestick_data, getSectorBySymbol, Is_symbol_exist, fetchStocks } from './apiFuntion/api_funtion';
import TradeBar from './MakeTrade/MakeTradeBar';

import CandlestickChart from './crt';
import CandlestickChartComponent from './chart';

export default function MarketPage() {
    const [activeTab, setActiveTab] = useState('day');
    const [symbol, setSymbol] = useState('OGDC');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const handleSubmit = (e) => {
        setSymbol(e.target.value);
    };
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <Optionbar />



                <div className="flex flex-row flex-1">
                    <div className="w-full bg-gray-100 overflow-y-auto flex flex-row">

                        {/* First object */}
                        <div className="flex-grow-1" style={{ minWidth: '50%' }}>
                            <object data="https://sarmaaya.pk/public/widgets/market-performers" width="100%" height="450" type="text/html">
                                Market Performers
                            </object>
                        </div>

                        {/* Second object */}
                        <div className="flex-grow-1" style={{ minWidth: '50%' }}>
                            <input
                                type="text"
                                value={symbol}
                                onChange={handleSubmit}
                                placeholder="Enter symbol..."
                                className="border border-gray-400 px-2 py-1 rounded"
                            />
                            <button
                                className="bg-green-400 hover:bg-green-500 text-white font-bold py-1 px-2 rounded"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                            <object data={`https://sarmaaya.pk/public/widgets/company-snapshot?stock_symbol=${symbol}`} width="100%" height="540" type="text/html">
                                Company Snapshot
                            </object>

                        </div>

                    </div>



                    <TradeBar />

                </div>
            </div>
        </>



    );
};















// const db = getFirestore(app);


// const getWalletData = async () => {
//     try {
//         const userDocRef = doc(db, 'portfolio', userId);
//         const userDocSnap = await getDoc(userDocRef);
//         if (userDocSnap.exists()) {
//             const data = userDocSnap.data().wallet;
//             return data;
//         } else {
//             console.log('User document does not exist.');
//             return null;
//         }
//     } catch (error) {
//         console.error('Error fetching wallet data:', error.message);
//         return null;
//     }
// };

