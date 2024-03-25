import { React, useState, useEffect } from 'react';
import Navbar from "../navbar/navbar";
import Optionbar from "./optionbar";
import CandlestickChart from './crt';
import TradeBar from './MakeTrade/MakeTradeBar';
// import { getprice, getchange, getSectorBySymbol, Is_symbol_exist } from './apiFuntion/api_funtion';
import { getcandlestick_data, fetchStocks } from './apiFuntion/api_funtion';
// import CandlestickChartComponent from './chart';
import CandlestickChartComponent from './temp-chart';
export default function TradePage() {

    const [data, setData] = useState([]);
    const [activeTab, setActiveTab] = useState('day');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
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
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Optionbar />
            <div className='flex flex-row items-center space-x-6'>
                <button
                    className={`bg-red-400 ${activeTab === 'day' && 'active'}`}
                    onClick={() => handleTabClick('day')}
                >
                    1 day
                </button>
                <div className='button-space-5'></div>
                <button
                    className={`bg-red-400 ${activeTab === 'historical' && 'active'}`}
                    onClick={() => handleTabClick('historical')}
                >
                    historical
                </button>
            </div>

            <div className="flex flex-row flex-1">
                <div className="w-full bg-gray-100 overflow-y-auto">

                    <div className="container mt-3">
                        {activeTab === 'day' && (
                            <CandlestickChart data={data} />
                        )}

                        {activeTab === 'historical' && (
                            <CandlestickChartComponent
                                symbol='OGDC'
                                startDate='DSF'
                                endDate='SDF'
                                style={{ width: '100%', height: '400px' }}
                            />
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
