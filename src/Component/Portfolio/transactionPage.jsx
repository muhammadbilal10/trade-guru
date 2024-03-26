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

export default function TransactionPage() {
  
  
  const [buyTransaction, setBuyTransaction] = useState([]);
  const [sellTransaction, setSellTransaction] = useState([]);
  const cookies = new Cookies();
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
                const transactions = userDocSnap.data().transactions || [];
  
                const buyTransactions = transactions.filter(transaction => transaction.type === 'Buy');
                const sellTransactions = transactions.filter(transaction => transaction.type === 'Sell');
  
                // console.log(buyTransactions);
                // console.log(sellTransactions);
                setBuyTransaction(buyTransactions);
                setSellTransaction(sellTransactions)
    
                // Process buyTransactions as needed
    
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
            <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
              Sell transactions 
            </h4>
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
              <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                  <thead>
                    <tr
                      className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                    >
                        <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Symbol</th>
                      <th className="px-4 py-3">sold qty</th>
                      <th className="px-4 py-3">Sell Price(PKR)</th>
                      <th className="px-4 py-3">Avg Buy Price(PKR)</th>
                      <th className="px-4 py-3">Sell Value(PKR) </th>
                      {/* realized profit/loss */}
                      <th className="px-4 py-3">Profi/Loss</th>
                     
                    </tr>
                  </thead>
                  <tbody
                    className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                  >
                    {sellTransaction.map((transaction, index) => (
                      <tr  key={index} className="text-gray-700 dark:text-gray-400">
                        <td className="px-4 py-3 text-sm">
                          {index+1}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center text-sm">

                            <div>
                              <p className="font-semibold">{transaction.symbol}</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                              {transaction.symbol}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {transaction.quantity}
                        </td>
                         {/* avg sell price */}
                        <td className="px-4 py-3 text-sm">
                          {transaction.price}
                        </td>
                         {/* avg buy price */}
                        <td className="px-4 py-3 text-sm">
                            {/* to be updated */}
                          {transaction.totalPrice}
                        </td>
                         {/* sell value */}
                        <td className="px-4 py-3 text-sm">
                          {transaction.totalPrice}
                        </td>
                        {/* profit/loss */}
                        <td className="px-4 py-3 text-sm">
                            {/* to be updated */}
                          {transaction.totalPrice}
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





