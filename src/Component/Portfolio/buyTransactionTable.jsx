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

export default function BuyTransactionTable({data}) {
  
  

  return (
    <>
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
                    {data.map((transaction, index) => (
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
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

    </>
  );
};





