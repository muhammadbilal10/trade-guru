import { React, useState, useEffect } from 'react';
import Navbar from "../navbar/navbar";
import Optionbar from "./optionbar";
import CandlestickChart from './crt';
import TradeBar from './MakeTrade/MakeTradeBar';
// import { getprice, getchange, getSectorBySymbol, Is_symbol_exist } from './apiFuntion/api_funtion';
import { getcandlestick_data, fetchStocks } from './apiFuntion/api_funtion';
// import CandlestickChartComponent from './chart';
import CandlestickChartComponent from './temp-chart';
export default function MarketSummaryPage() {


    // // Sort the data by timestamp in
    // const sortedData = inputList.sort((a, b) => a[0] - b[0]);

    const [candle, setCandle] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const data = await getcandlestick_data('HBL');
    //         // console.log(data);
    //         setCandle(data); // Update state with fetched data
    //     };

    //     fetchData();

    // }, []);


    // const [stocksData, setStocksData] = useState(null);
    // const symbol = 'HBL'; // Replace 'yourSymbol' with the actual symbol
    // const startDate = '2020, 1, 1'; // Replace 'yourStartDate' with the actual start date
    // const endDate = 'yourEndDate'; // Replace 'yourEndDate' with the actual end date

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const data = await fetchStocks(symbol, startDate, endDate);
    //             // Verify that the fetched data is an array and not empty
    //             if (Array.isArray(data) && data.length > 0) {
    //                 // Map over the fetched data to format it according to the required format
    //                 const formattedData = data.map(item => ({
    //                     time: item.Date,
    //                     open: item.Open,
    //                     high: item.High,
    //                     low: item.Low,
    //                     close: item.Close,
    //                 }));
    //                 // Set the formatted data in the state
    //                 setStocksData(formattedData);
    //             } else {
    //                 // Handle case where fetched data is empty or not in the expected format
    //                 console.error('Fetched data is empty or not in the expected format');
    //             }
    //         } catch (error) {
    //             // Handle fetch error
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);



    // const temp = async () => {
    //     console.log(candle);
    // };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Optionbar />
            <div className="flex flex-1">
                <div className="flex-grow bg-gray-100 overflow-y-auto">
                    <CandlestickChartComponent
                        symbol='HBL'
                        startDate='DSF'
                        endDate='SDF'
                        style={{ width: '600%', height: '500px' }} // Adjust the height as needed
                    />
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
