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
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const temp = await getcandlestick_data("HBL");
                if (temp) {
                    setData(temp);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);


    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <Optionbar />
                <div className="flex flex-row flex-1">
                    <div className="w-full bg-gray-100 overflow-y-auto">

                        <div className="container mt-3">
                            {/* <h2 className="mb-6">Daily chart</h2> */}
                            <CandlestickChart data={data} />
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

