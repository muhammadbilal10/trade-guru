import React, { useState, useEffect } from 'react';
import Navbar from "../navbar/navbar";
import Optionbar from "./optionbar";
import app from '../../database/firebase';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from 'firebase/firestore';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getprice, getchange, getSectorBySymbol, Is_symbol_exist } from './apiFuntion/api_funtion';
import Cookies from 'universal-cookie';
import TradeBar from './MakeTrade/MakeTradeBar';

export default function Positions_page() {

  const cookies = new Cookies();
  const [stockHoldings, setStockHoldings] = useState([]);
  const [userId, setUserId] = useState(cookies.get('userId'));
  const db = getFirestore(app);
  const [symbolData, setSymbolData] = useState({});

  const fetchSymbolData = async (symbol) => {
    try {
      const [price, value, percent] = await getchange(symbol.toUpperCase());
      return { price, value, percent };
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error.message);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDocRef = doc(db, "portfolio", userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const stockHoldingsData = userDocSnap.data().stockHoldings || {};
          const stockHoldingsEntries = Object.entries(stockHoldingsData);
          setStockHoldings(stockHoldingsEntries);
          for (const [symbol, holding] of stockHoldingsEntries) {
            const data = await fetchSymbolData(symbol);
            const currentCost = data.price * holding.quantity;
            const change = Number(currentCost - holding.cost);
            const newdata = { ...data, currentCost, change };
            console.log(newdata);
            if (newdata) {
              setSymbolData(prevState => ({
                ...prevState,
                [symbol]: newdata
              }));
            } else {
              console.error(`Error fetching data for ${symbol}`);
            }
          }
        } else {
          console.error('User document not found');
        }
      } catch (error) {
        console.error('Error fetching user portfolio data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>

      <div className="flex h-screen bg-gray-5  flex-col flex-1 w-full">
        <Navbar />
        <Optionbar />
        <div className='flex flex-1 flex-row'>

          <div className='w-10/12' >

            <div className=" bg-white text-primary flex justify-between items-center px-8 border-t border-b border-gray-300">
              <div className="flex items-center space-x-6">
                <button className="hover:bg-primary hover:text-white text-black px-4 py-2 rounded-lg transition duration-300"
                  onClick={() => handleTabClick('stock')}
                >
                  STOCK & ETF
                </button>
                <div className='button-space-5'></div>

                <button className="hover:bg-primary hover:text-white text-black px-4 py-2 rounded-lg transition duration-300"
                  onClick={() => handleTabClick('short')}
                >
                  SHORTS
                </button>
                <button className="hover:bg-primary hover:text-white text-black px-4 py-2 rounded-lg transition duration-300"
                  onClick={() => handleTabClick('crypto')}
                >
                  Crypto
                </button>
              </div>
            </div>
            {/* <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
              Open Position
            </h4> */}
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
              <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                  <thead>
                    <tr
                      className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                    >
                      <th className="px-4 py-3">Symbol</th>
                      <th className="px-4 py-3">Share</th>
                      <th className="px-4 py-3">Avg Price</th>
                      <th className="px-4 py-3">current Price</th>
                      <th className="px-4 py-3">Daily change </th>
                      <th className="px-4 py-3">Targert Price</th>
                      <th className="px-4 py-3">Stop Loss</th>
                      <th className="px-4 py-3">Total Cost</th>
                      {/* current value of asset  */}
                      <th className="px-4 py-3">Current price/cost</th>
                      <th className="px-4 py-3">Equity,%</th>
                      {/* Net profit loss  */}
                      <th className="px-4 py-3">Profit/Loss</th>
                      <th className="px-4 py-3">Equity,%</th>
                    </tr>
                  </thead>
                  <tbody
                    className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                  >
                    {stockHoldings.map(([symbol, holding]) => (
                      <tr key={symbol} className="text-gray-700 dark:text-gray-400">
                        <td className="px-4 py-3">
                          <div className="flex items-center text-sm">

                            <div>
                              <p className="font-semibold">{symbol}</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {holding.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {holding.quantity}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {/* avg price */}
                          {holding.averagePrice}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {/* current price */}

                          {symbolData[symbol]?.price ||
                            <div className="w-3 h-3 border-4 border-dashed rounded-full animate-spin border-default-600"></div>}
                        </td>

                        <td className="px-4 py-3 text-sm">
                          {/* Daily change */}
                          {symbolData[symbol]?.value !== undefined ? (
                            <span className={symbolData[symbol]?.value >= 0 ? "text-green-500" : "text-red-500"}>
                              {symbolData[symbol]?.value}
                            </span>
                          ) : (
                            <div className="w-3 h-3 border-4 border-dashed rounded-full animate-spin border-default-600"></div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {/* TARGET price*/}
                          {holding.targetPrice}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {/* stoploss*/}
                          {holding.stoploss}
                        </td>



                        <td className="px-4 py-3 text-sm">
                          {/* total cost*/}
                          {holding.cost}
                        </td>


                        <td className="px-4 py-3 text-sm">
                          {/* Current cost*/}
                          {parseFloat(symbolData[symbol]?.currentCost.toFixed(3)) ||
                            <div className="w-3 h-3 border-4 border-dashed rounded-full animate-spin border-default-600"></div>}
                        </td>

                        <td className="px-4 py-3 text-sm">
                          {/* cost in percent*/}
                          {parseFloat(symbolData[symbol]?.currentCost.toFixed(3)) ||
                            <div className="w-3 h-3 border-4 border-dashed rounded-full animate-spin border-default-600"></div>}
                        </td>

                        <td className="px-4 py-3 text-sm">
                          {/* Profit/Loss */}
                          {symbolData[symbol]?.change != null && symbolData[symbol].change !== '' ? (
                            <span className={symbolData[symbol].change < 0 ? "text-red-500" : symbolData[symbol].change > 0 ? "text-green-500" : "text-black"}>
                              {parseFloat(symbolData[symbol]?.change.toFixed(3))}
                            </span>
                          ) : (
                            <div className="w-3 h-3 border-4 border-dashed rounded-full animate-spin border-default-600"></div>
                          )}
                        </td>


                        <td className="px-4 py-3 text-sm">
                          {/* stoploss*/}
                          null
                        </td>

                        {/* <td className="px-4 py-3 text-xs">
                              <span
                                classNameName={`px-2 py-1 font-semibold leading-tight rounded-full ${user.status
                                  ? 'text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100'
                                  : 'text-red-700 bg-red-100 dark:bg-red-700 dark:text-red-100'
                                  }`}
                              >
                                {user.status ? 'approved' : 'not approved'}
                              </span>
                            </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

          </div>
          <TradeBar />

        </div>




      </div>
    </>
  );
};




