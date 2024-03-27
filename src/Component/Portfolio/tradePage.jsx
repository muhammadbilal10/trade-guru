import { React, useState, useEffect } from 'react';
import Navbar from "../navbar/navbar";
import Optionbar from "./optionbar";
import CandlestickChart from './crt';
import TradeBar from './MakeTrade/MakeTradeBar';
import { getprice, getchange, getSectorBySymbol, Is_symbol_exist } from './apiFuntion/api_funtion';
import { getcandlestick_data, fetchStocks } from './apiFuntion/api_funtion';
// import CandlestickChartComponent from './chart';
import CandlestickChartComponent from './temp-chart';
export default function TradePage() {
    const [symbol, setSymbol] = useState('OGDC');
    const [dailydata, setDailyData] = useState([]);
    const [histdata, setHistdata] = useState([]);
    const [symbolsList, setSymbolsList] = useState([]);
    const [activeTab, setActiveTab] = useState('day');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/get_symbol');
                if (!response.ok) {
                    throw new Error('Failed to fetch symbols');
                }
                const data = await response.json();
                // Filter data based on conditions
                const filteredData = data.filter(item => item.sectorName !== 'BILLS AND BONDS' || !item.isDebt);

                // Set filteredData in the SymbolsList
                setSymbolsList(filteredData);
            } catch (error) {
                console.error('Error fetching symbols:', error.message);
            }
        };
        const fetchDailydata = async () => {
            try {
                const temp = await getcandlestick_data(symbol);
                if (temp) {
                    setDailyData(temp);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchHistoricaldata = async () => {
            try {
                const temp = await fetchStocks(symbol);
                if (temp) {
                    setHistdata(temp);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        fetchDailydata();
        fetchHistoricaldata();
    }, []);


    const fetchDailyData = async () => {
        if (Is_symbol_exist(symbolsList, symbol.toLocaleUpperCase())) {
            try {
                const temp = await getcandlestick_data(symbol);
                if (temp) {
                    setDailyData(temp);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    const fetchHistoricalData = async () => {
        if (Is_symbol_exist(symbolsList, symbol.toLocaleUpperCase())) {
            try {

                const temp = await fetchStocks(symbol);
                if (temp) {
                    setHistdata(temp);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };




    const handleSymbolInput = (e) => {
        setSymbol(e.target.value);
    };
    const handleSubmit = () => {
        fetchDailyData();
        fetchHistoricalData();
    };
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Optionbar />
            <div className='flex flex-row items-center space-x-6'>
                <button
                    className={`bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded-full ${activeTab === 'day' && 'active'}`}
                    onClick={() => handleTabClick('day')}
                >
                    1 day
                </button>
                <div className='button-space-5'></div>
                <button
                    className={`bg-green-400 hover:bg-green-500 text-white font-bold py-1 px-2 rounded-full ${activeTab === 'historical' && 'active'}`}
                    onClick={() => handleTabClick('historical')}
                >
                    Historical
                </button>
                <input
                    type="text"
                    value={symbol}
                    onChange={handleSymbolInput}
                    placeholder="Enter symbol..."
                    className="border border-gray-400 px-2 py-1 rounded"
                />
                <button
                    className="bg-green-400 hover:bg-green-500 text-white font-bold py-1 px-2 rounded-full"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>



            <div className="flex flex-row flex-1">
                <div className="w-full bg-gray-100 overflow-y-auto">

                    <div className="container mt-3">
                        <h1>chart is of {symbol}</h1>
                        {activeTab === 'day' && (
                            <CandlestickChart data={dailydata} />
                        )}

                        {activeTab === 'historical' && (
                            <CandlestickChartComponent data={histdata} />
                        )}
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
