import React from 'react';
import Navbar from "../navbar/navbar";
import Optionbar from "./optionbar";
import TradingViewCandlestickChart from './crt';

export default function MarketSummaryPage() {

    const rawData = [
        [1708084841, 110.06, 112.06, 109.24, 110.55],
        [1708084800, 110.06, 111.30, 109.89, 110.50],
        [1708082950, 109.25, 110.42, 108.67, 109.50],
        
        
        // Add more data points as needed
    ];
    return (
        <div className="flex flex-col min-h-screen bg-white text-black">
            <Navbar />
            <Optionbar />
            <div className="flex-1 flex justify-center p-4">
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
                <div>
                    <h1>TradingView Candlestick Chart Example</h1>
                    <TradingViewCandlestickChart rawData={rawData} />
                </div>
            </div>

        </div>
    );
}
