import { React, useState, useEffect } from 'react';
import OverviewCard from "./overviewcard";
import Navbar from "../navbar/navbar";
import Optionbar from "./optionbar";

export default function Portfolio_Main_Page() {

    return (
        <div className="flex flex-col min-h-screen bg-white text-black">
            <Navbar />
            <Optionbar />
            <div className="flex flex-1 p-4">
                <div className="flex-1">
                    <OverviewCard />
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <object
                        className="background-color-black"

                        data="https://sarmaaya.pk/public/widgets/market-snapshot"
                        width="100%"
                        height="540"
                        type="text/html"
                    >
                        Market Snapshot
                    </object>
                </div>
                {/* <object data="https://sarmaaya.pk/public/widgets/market-history-chart?market_symbol=KSE100"
                    width="100%" height="500"
                    type="text/html"> 
                </object> */}


            </div>

        </div>


    );
}























// function convertToCandlestickData(data, intervalInMinutes) {
//     const candlestickData = [];
//     let currentInterval = null;
//     let currentHigh = Number.MIN_SAFE_INTEGER;
//     let currentLow = Number.MAX_SAFE_INTEGER;

//     for (const [timestamp, price, volume] of data) {
//         const time = new Date(timestamp * 1000).toLocaleTimeString('en-US', {
//             timeZone: 'Asia/Karachi',
//             hour12: false,
//             hour: '2-digit',
//             minute: '2-digit',
//             second: '2-digit'
//         });

//         // If currentInterval is null or time exceeds current interval, create a new interval
//         if (!currentInterval || currentInterval.time !== time) {
//             if (currentInterval) {
//                 candlestickData.push([currentInterval.time, currentInterval.open, currentHigh, currentLow, currentInterval.close]);
//             }
//             currentInterval = {
//                 time,
//                 open: price,
//                 high: price,
//                 low: price,
//                 close: price
//             };
//             // Reset current high and low
//             currentHigh = price;
//             currentLow = price;
//         } else { // Update currentInterval with new price
//             currentInterval.high = Math.max(currentInterval.high, price);
//             currentInterval.low = Math.min(currentInterval.low, price);
//             currentInterval.close = price;
//             // Update current high and low
//             currentHigh = Math.max(currentHigh, price);
//             currentLow = Math.min(currentLow, price);
//         }
//     }

//     // Push the last interval if exists
//     if (currentInterval) {
//         candlestickData.push([currentInterval.time, currentInterval.open, currentHigh, currentLow, currentInterval.close]);
//     }

//     return candlestickData;
// }

// // Example usage
// const candlestickData = convertToCandlestickData(inputList, 1);
// console.log(candlestickData);
