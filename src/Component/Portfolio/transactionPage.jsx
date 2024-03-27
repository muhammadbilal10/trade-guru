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
import SellTransactionTable from './SellTransactionTable';
import BuyTransactionTable from './buyTransactionTable';

export default function TransactionPage() {


  const [buyTransaction, setBuyTransaction] = useState([]);
  const [sellTransaction, setSellTransaction] = useState([]);
  const cookies = new Cookies();
  const [userId, setUserId] = useState(cookies.get('userId'));
  const db = getFirestore(app);
  const [symbolData, setSymbolData] = useState({});
  const [recordType, setRecordType] = useState('buy');
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



  const handleTabClick = (type) => {
    if (type === 'sell') {
      setRecordType('sell');
    } else {
      setRecordType('buy');
    }
  };
  return (
    <>

      <div className="flex h-screen bg-gray-5  flex-col flex-1 w-full">
        <Navbar />
        <Optionbar />
        <div className='flex flex-1 flex-row'>
          <div className='w-10/12' >
            <div className="flex items-center space-x-6">
              <button className="hover:bg-primary hover:text-white text-black px-4 py-2 rounded-lg transition duration-300"
                onClick={() => handleTabClick('buy')}
              >
                Buy Record
              </button>
              <div className='button-space-5'></div>

              <button className="hover:bg-primary hover:text-white text-black px-4 py-2 rounded-lg transition duration-300"
                onClick={() => handleTabClick('sell')}
              >
                Sell Record
              </button>

            </div>
            {recordType === 'sell' ? (
              <SellTransactionTable data={sellTransaction} />
            ) : (
              <BuyTransactionTable data={buyTransaction} />
            )}

          </div>
          <TradeBar />

        </div>




      </div>
    </>
  );
};





