import { React, useState } from 'react';
import { Dialog } from '@headlessui/react'
import { getprice, getchange, getSectorBySymbol, Is_symbol_exist, getSymbolName } from '../apiFuntion/api_funtion';
import Cookies from 'universal-cookie';
import app from '../../../database/firebase';
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export default function BuyModal({ isOpen, setIsOpen, symbol, quantity, setPrice, setPercent, setValue, SymbolsList }) {
  const cookies = new Cookies();
  const [comment, setComment] = useState('');
  const [targetPrice, setTargetPrice] = useState(0);
  const [stoploss, setStoploss] = useState(0);
  const [userId, setUserId] = useState(cookies.get('userId'));
  const db = getFirestore(app);
  const [error_stoploss, setError_Stoploss] = useState({
    status: false,
    message: ''
  })
  const [error_targetprice, setError_Trgetprice] = useState({
    status: false,
    message: ''
  })

  const handleConfirmBuy = async () => {



    try {
      console.log('userid',cookies.get('userId'));
      
      if (Is_symbol_exist(SymbolsList, symbol.toLocaleUpperCase()) && quantity >= 10) {
        const userDocRef = doc(db, "portfolio", userId);
        const userDocSnap = await getDoc(userDocRef);
        // Fetch the latest stock price and calculate total price
        const change = await getchange(symbol.toUpperCase());
        const price = change[0];
        const totalPrice = price * quantity;
        setPercent(change[2]);
        setValue(change[1]);
        setPrice(change[0]);
        // Check if user document snapshot exists

        if (stoploss >= price) {
          setError_Stoploss({
            status: true,
            message: 'stop loss connot be grwater then price'
          });
          return;
        }
        else if (targetPrice <= price) {
          setError_Trgetprice({
            status: true,
            message: 'Indvalid Target Price'
          });
          return;
        }

        /////clear error msg
        setError_Stoploss({
          status: false,
          message: ''
        });
        setError_Trgetprice({
          status: false,
          message: ''
        });
        if (userDocSnap.exists()) {
          const userWallet = userDocSnap.data().wallet;
          if (totalPrice > userWallet.cash_in_hand) {
            throw new Error("Insufficient funds in cash_in_hand");
          }
          const newTransaction = {
            symbol: symbol.toUpperCase(),
            name: getSymbolName(SymbolsList, symbol.toUpperCase()),
            quantity: Number(quantity),
            price: parseFloat(price.toFixed(3)),
            totalPrice: parseFloat(totalPrice.toFixed(3)),
            sector: getSectorBySymbol(SymbolsList, symbol.toUpperCase()),
            date: new Date().toISOString().split('T')[0],
            comment: comment,
            type: 'Buy'
          };
          const stockHoldings = userDocSnap.data().stockHoldings || {};
          if (stockHoldings[symbol.toUpperCase()]) {
            //cost: parseFloat(totalPrice.toFixed(3)),
            // Update existing entry
            const oldTotalQuantity = Number(stockHoldings[symbol.toUpperCase()].quantity);
            const oldAveragePrice = stockHoldings[symbol.toUpperCase()].averagePrice;
            const oldCost = stockHoldings[symbol.toUpperCase()].cost;
            const newTotalQuantity = oldTotalQuantity + Number(quantity);
            const newCost = Number(oldCost + totalPrice);
            // Calculate new average price
            const newAveragePrice = ((oldTotalQuantity * oldAveragePrice) + (Number(quantity) * price)) / newTotalQuantity;
            // Update stock holdings
            stockHoldings[symbol.toUpperCase()] = {
              ...stockHoldings[symbol.toUpperCase()],
              quantity: Number(newTotalQuantity),
              averagePrice: parseFloat(newAveragePrice.toFixed(3)),
              cost: parseFloat(newCost.toFixed(3)),
              stoploss: Number(stoploss),
              targetPrice: Number(targetPrice)
            };
          } else {

            stockHoldings[symbol.toUpperCase()] = {
              symbol: symbol.toUpperCase(),
              name: getSymbolName(SymbolsList, symbol.toUpperCase()),
              quantity: Number(quantity),
              averagePrice: parseFloat(price.toFixed(3)),
              cost: parseFloat(totalPrice.toFixed(3)),
              sector: getSectorBySymbol(SymbolsList, symbol.toUpperCase()),
              stoploss: Number(stoploss),
              targetPrice: Number(targetPrice)
            };
          }

          // Add the new transaction to the existing transactions array
          await updateDoc(userDocRef, {

            transactions: [...(userDocSnap.data().transactions || []), newTransaction],
            stockHoldings: stockHoldings,

            "wallet.cash_in_hand": parseFloat(userWallet.cash_in_hand - totalPrice).toFixed(3),
            ///////need to be updated
            "wallet.net_worth": parseFloat(userWallet.net_worth - userWallet.cash_in_hand + (userWallet.cash_in_hand - totalPrice)).toFixed(3)

          });

          setIsOpen(false);
        } else {
          // If the user document doesn't exist, create a new document with the provided user ID
          await setDoc(userDocRef, {
            transactions: [{
              symbol: symbol.toUpperCase(),
              name: getSymbolName(SymbolsList, symbol.toUpperCase()),
              quantity: quantity,
              price: parseFloat(price.toFixed(3)),
              totalPrice: parseFloat(totalPrice.toFixed(3)),
              sector: getSectorBySymbol(SymbolsList, symbol.toUpperCase()),
              date: new Date().toISOString().split('T')[0],//just date
              comment: comment,
              type: 'Buy'
            }],

            stockHoldings: {
              [symbol.toUpperCase()]: { // Use symbol as the key/index
                symbol: symbol.toUpperCase(),
                name: getSymbolName(SymbolsList, symbol.toUpperCase()),
                quantity: Number(quantity),
                averagePrice: parseFloat(price.toFixed(3)),
                cost: parseFloat(totalPrice.toFixed(3)),
                sector: getSectorBySymbol(SymbolsList, symbol.toUpperCase()),
                stoploss: Number(stoploss),
                targetPrice: Number(targetPrice)
              }
            },
            wallet: {
              currency: "PKR",
              balance: 1000000, // Initial balance of 1000k rupees.it can be changed
              cash_in_hand: 1000000 - totalPrice, // Subtract the purchase price from initial balance
              net_worth: 1000000, // Initial net worth
              total_gain_loss: 0 // Initial total gain/loss
            }
          });
          setIsOpen(false);
        }

        console.log('Transaction added successfully to user portfolio:', cookies.get('userId'));
      } else {
        console.log('Symbol does not exist or quantity is less than 10. Skipping transaction.');
      }

    } catch (error) {
      console.error("Error adding transaction:", error.message);
    }

  };


  return (
    <Dialog open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Dialog.Panel className="fixed inset-0 flex items-center justify-center overflow-auto" >
        <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="symbol" className="block mb-1">Symbol</label>
            <input
              id="symbol"
              type="text"
              className="block w-full px-3 py-2 border rounded focus:outline-none focus:border-purple-400"
              value={symbol}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block mb-1">Quantity</label>
            <input
              id="quantity"
              type="number"
              className="block w-full px-3 py-2 border rounded focus:outline-none focus:border-purple-400"
              value={quantity}
            // readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="targetPrice" className="block mb-1">Target Price</label>
            <input
              id="targetPrice"
              type="number"
              className="block w-full px-3 py-2 border rounded focus:outline-none focus:border-purple-400"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
            //required
            />
            {
              error_targetprice?.status &&
              <p className="text-red-500 text-xs">{error_targetprice?.message}</p>
            }
          </div>

          <div className="mb-4">
            <label htmlFor="stoploss" className="block mb-1">Stop Loss</label>
            <input
              id="stoploss"
              type="number"
              className="block w-full px-3 py-2 border rounded focus:outline-none focus:border-purple-400"
              value={stoploss}
              onChange={(e) => setStoploss(e.target.value)}
            //required
            />
            {
              error_stoploss?.status &&
              <p className="text-red-500 text-xs">{error_stoploss?.message}</p>
            }
          </div>

          <div className="mb-4">
            <label htmlFor="comment" className="block mb-1">Comment</label>
            <textarea
              id="comment"
              className="block w-full px-3 py-2 border rounded focus:outline-none focus:border-purple-400"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="px-4 py-2 mr-2 text-white bg-green-600 rounded hover:bg-green-700"
              onClick={handleConfirmBuy}
            >
              Confirm Buy
            </button>
            <button
              className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>

        </div>
      </Dialog.Panel>
    </Dialog>
  )
}
