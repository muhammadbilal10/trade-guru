import React from 'react';
import OverviewCard from "./overviewcard";
import Navbar from "../navbar/navbar";
import Optionbar from "./optionbar";

export default function Portfolio_Main_Page() {
    // Dummy data for overview cards
    const overviewData = [
        { title: "Total Portfolio Value", value: "$10,000", loading: false, error: null },
        { title: "Total Profit/Loss", value: "$2,500", loading: false, error: null },
        { title: "Asset Allocation", value: "50% Stocks, 30% Bonds, 20% Cash", loading: false, error: null },
        // Add more dummy data for additional cards
    ];


    function convertTimestamps(list) {
        // Function to convert timestamp to time only in PST
        const convertToTimeOnly = (timestamp) => {
            const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
            const options = {
                timeZone: 'Asia/Karachi', // Set timezone to Pakistan Standard Time
                hour12: false, // Use 24-hour format
                hour: '2-digit', // Display hour in 2-digit format
                minute: '2-digit', // Display minute in 2-digit format
                second: '2-digit', // Display second in 2-digit format
            };
            return date.toLocaleTimeString('en-US', options);
        };

        // Map over the input list and convert timestamps
        return list.map(item => {
            const timestamp = item[0];
            const convertedTime = convertToTimeOnly(timestamp);
            return [convertedTime, ...item.slice(1)]; // Replace timestamp with converted time
        });
    }

    // Example usage
    const inputList = [
        [1709294546, 117.06, 30], [1709294431, 117.06, 300], [1709294400, 117.06, 0],
        [1709292599, 116.85, 25], [1709292592, 117, 10000], [1709292579, 117, 16000],
        [1709292573, 116.99, 2000], [1709292508, 116.8, 47], [1709292502, 117, 9953],
        [1709292470, 117, 100],
        [1709292467, 117.2, 700]
    ];

    function convertToCandlestickData(data, intervalInMinutes) {
        const candlestickData = [];
        let currentInterval = null;
        let currentHigh = Number.MIN_SAFE_INTEGER;
        let currentLow = Number.MAX_SAFE_INTEGER;

        for (const [timestamp, price, volume] of data) {
            const time = new Date(timestamp * 1000).toLocaleTimeString('en-US', {
                timeZone: 'Asia/Karachi',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            // If currentInterval is null or time exceeds current interval, create a new interval
            if (!currentInterval || currentInterval.time !== time) {
                if (currentInterval) {
                    candlestickData.push([currentInterval.time, currentInterval.open, currentHigh, currentLow, currentInterval.close]);
                }
                currentInterval = {
                    time,
                    open: price,
                    high: price,
                    low: price,
                    close: price
                };
                // Reset current high and low
                currentHigh = price;
                currentLow = price;
            } else { // Update currentInterval with new price
                currentInterval.high = Math.max(currentInterval.high, price);
                currentInterval.low = Math.min(currentInterval.low, price);
                currentInterval.close = price;
                // Update current high and low
                currentHigh = Math.max(currentHigh, price);
                currentLow = Math.min(currentLow, price);
            }
        }

        // Push the last interval if exists
        if (currentInterval) {
            candlestickData.push([currentInterval.time, currentInterval.open, currentHigh, currentLow, currentInterval.close]);
        }

        return candlestickData;
    }

    // Example usage
    const candlestickData = convertToCandlestickData(inputList, 1);
    console.log(candlestickData);







    return (
        <div className="flex flex-col min-h-screen bg-white text-black">
            <Navbar />
            <Optionbar />
            <div className="flex-1 flex flex-wrap justify-center p-4">
                {overviewData.map((data, index) => (
                    <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-4">
                        <OverviewCard title={data.title} value={data.value} loading={data.loading} error={data.error} />
                    </div>
                ))}
            </div>
        </div>


    );
}