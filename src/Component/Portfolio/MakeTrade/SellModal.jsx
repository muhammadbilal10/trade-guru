import { React, useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react'
import { getprice, getchange, getSectorBySymbol, Is_symbol_exist } from '../apiFuntion/api_funtion';
import Cookies from 'universal-cookie';
import app from '../../../database/firebase';
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export default function SellModal({ isOpen, setIsOpen, symbol, quantity, SymbolsList }) {
  const cookies = new Cookies();
  const [comment, setComment] = useState('');
  const [userId, setuserId] = useState(cookies.get('userId'));

  const db = getFirestore(app);

  const handleConfirmSell = async () => {
    try {
      const userDocRef = doc(db, "portfolio", userId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const stockHoldings = userDocSnap.data().stockHoldings || {};
        ///////////////////////////////////////////
        //////////add toste
        if (!stockHoldings[symbol.toUpperCase()]) {
          console.log("Nothing to sell for symbol:", symbol);
          return;
        }
        else if (quantity <= 0) {
          console.log("negative qty:", symbol);
          return;
        }

        const userWallet = userDocSnap.data().wallet;
        const change = await getchange(symbol.toUpperCase());
        const price = change[0];
        const totalPrice = price * quantity;

        // Update wallet
        await updateDoc(userDocRef, {
          "wallet.cash_in_hand": parseFloat(userWallet.cash_in_hand + totalPrice).toFixed(3),
          "wallet.net_worth": parseFloat(userWallet.net_worth + totalPrice).toFixed(3)
        });

        // Create the sell transaction object
        const newTransaction = {
          symbol: symbol.toUpperCase(),
          quantity: quantity, // Negative quantity for sell transaction
          price: Number(price),
          totalPrice: parseFloat(totalPrice).toFixed(3),
          sector: getSectorBySymbol(SymbolsList, symbol.toUpperCase()),
          date: new Date().toISOString().split('T')[0],
          type: 'Sell'
        };

        // Add the new transaction to the existing transactions array
        await updateDoc(userDocRef, {
          transactions: [...(userDocSnap.data().transactions || []), newTransaction]
        });

        // Update stock holdings
        const oldTotalQuantity = stockHoldings[symbol.toUpperCase()].quantity;
        const oldAveragePrice = stockHoldings[symbol.toUpperCase()].averagePrice;
        const newTotalQuantity = oldTotalQuantity - quantity;

        if (newTotalQuantity === 0) {
          // If all stocks are sold, remove the symbol from holdings
          delete stockHoldings[symbol.toUpperCase()];
        } else {
          // Calculate new average price
          const newAveragePrice = ((oldTotalQuantity * oldAveragePrice) - (quantity * price)) / newTotalQuantity;
          stockHoldings[symbol.toUpperCase()] = {
            ...stockHoldings[symbol.toUpperCase()],
            totalQuantity: Number(newTotalQuantity),
            averagePrice: (newAveragePrice).toFixed(3)
          };
        }

        // Update stock holdings
        await updateDoc(userDocRef, {
          stockHoldings: stockHoldings
        });

        setIsOpen(false)
        console.log("Sell transaction processed successfully.");
      } else {
        console.error("User document does not exist.");
      }
    } catch (error) {
      console.error("Error selling stocks:", error.message);
    }
  };


  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Dialog.Panel className="fixed inset-0 flex items-center justify-center overflow-auto">
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
              readOnly
            />
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
              className="px-4 py-2 mr-2 text-white bg-red-600 rounded hover:bg-red-700"
              onClick={handleConfirmSell}
            >
              Confirm Sell
            </button>
            <button
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
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
