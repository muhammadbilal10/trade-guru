import { React, useState, useEffect } from 'react';
import Navbar from "../navbar/navbar";
import Optionbar from "./optionbar";
import CandlestickChart from './crt';
import TradeBar from './MakeTrade/MakeTradeBar';
// import { getprice, getchange, getSectorBySymbol, Is_symbol_exist } from './apiFuntion/api_funtion';
import { getcandlestick_data } from './apiFuntion/api_funtion';

export default function MarketSummaryPage() {

   
    // // Sort the data by timestamp in
    // const sortedData = inputList.sort((a, b) => a[0] - b[0]);
   
    const [candle, setCandle] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getcandlestick_data('HBL');
            console.log(data);
            setCandle(data); // Update state with fetched data
        };

        fetchData();
    }, []);

    // const temp = async () => {
    //     console.log(candle);
    // };

    return (
        <div className="flex flex-col min-h-screen bg-white text-black">
            <Navbar />
            <Optionbar />
            <div className="flex-1 flex">
                <div className="flex-1 flex flex-col justify-center p-4">
                    <div className="p-4">
                        <h1 className="text-2xl font-bold mb-4">TradingView Candlestick Chart Example</h1>
                        <CandlestickChart data={candle} />
                    </div>
                </div>
                <TradeBar />
            </div>
        </div>
    );
    
}







{/* 
                <object
                    className='bg-gray-200'
                    data="https://sarmaaya.pk/public/widgets/market-snapshot"
                    width="40%"
                    height="540"
                    type="text/html"
                >
                    Market Snapshot
                </object>
                <object
                    className='bg-gray-200'
                    data="https://sarmaaya.pk/public/widgets/market-performers"
                    width="40%"
                    height="450"
                    type="text/html"
                    style={{ maxWidth: '100%', border: 'none' }}
                >
                    Market Performers
                </object>
                <object
                    className='bg-gray-200'
                    data="https://sarmaaya.pk/public/widgets/company-snapshot?stock_symbol=PSO"
                    width="40%"
                    height="450"
                    type="text/html">
                    Company Snapshot
                </object> */}
