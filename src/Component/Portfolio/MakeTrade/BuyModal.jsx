import { React, useState } from 'react';
import { Dialog } from '@headlessui/react'
import { getprice, getchange, getSectorBySymbol, Is_symbol_exist } from '../apiFuntion/api_funtion';
import Cookies from 'universal-cookie';
import app from '../../../database/firebase';
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export default function BuyModal({ isOpen, setIsOpen, symbol, quantity, setPrice, setPercent, setValue, SymbolsList }) {
  const cookies = new Cookies();
  let completeButtonRef = useRef(null)
  const [comment, setComment] = useState('');
  const [userId, setUserId] = useState(cookies.get('userId'));
  const db = getFirestore(app);

  const handleConfirmBuy = async () => {
    try {
      // Check if the symbol exists and if the quantity is valid
      if (Is_symbol_exist(SymbolsList, symbol.toLocaleUpperCase()) && quantity >= 10) {
        // Retrieve the user document reference
        const userDocRef = doc(db, "portfolio", userId);
        // Retrieve the user document snapshot
        const userDocSnap = await getDoc(userDocRef);
        // Fetch the latest stock price and calculate total price
        const change = await getchange(symbol.toUpperCase());
        const price = change[0];
        const totalPrice = price * quantity;
        setPercent(change[2]);
        setValue(change[1]);
        setPrice(change[0]);
        // Check if user document snapshot exists
        if (userDocSnap.exists()) {
          // Retrieve user's wallet data
          const userWallet = userDocSnap.data().wallet;
          // Check if user has sufficient cash in hand to make the purchase
          if (totalPrice > userWallet.cash_in_hand) {
            throw new Error("Insufficient funds in cash_in_hand");
          }

          // Create the new transaction object
          const newTransaction = {
            symbol: symbol.toUpperCase(),
            quantity: Number(quantity),
            price: price,
            totalPrice: totalPrice,
            sector: getSectorBySymbol(SymbolsList, symbol.toUpperCase()),
            date: new Date().toISOString().split('T')[0],
            comment: comment,
            type: 'Buy'
          };

          const stockHoldings = userDocSnap.data().stockHoldings || {};
          if (stockHoldings[symbol.toUpperCase()]) {
            // Update existing entry
            const oldTotalQuantity = Number(stockHoldings[symbol.toUpperCase()].totalQuantity);
            const oldAveragePrice = stockHoldings[symbol.toUpperCase()].averagePrice;
            const newTotalQuantity = oldTotalQuantity + Number(quantity);
            // Calculate new average price
            const newAveragePrice = ((oldTotalQuantity * oldAveragePrice) + (Number(quantity) * price)) / newTotalQuantity;
            // Update stock holdings
            stockHoldings[symbol.toUpperCase()] = { totalQuantity: Number(newTotalQuantity), averagePrice: newAveragePrice };
          } else {
            // Add new entry with quantity as number
            stockHoldings[symbol.toUpperCase()] = { totalQuantity: Number(quantity), averagePrice: price };
          }

          ////////////

          // Add the new transaction to the existing transactions array
          await updateDoc(userDocRef, {

            transactions: [...(userDocSnap.data().transactions || []), newTransaction],
            stockHoldings: stockHoldings,
            "wallet.cash_in_hand": userWallet.cash_in_hand - totalPrice,
            "wallet.net_worth": userWallet.net_worth - userWallet.cash_in_hand + (userWallet.cash_in_hand - totalPrice)

          });

          setIsOpen(false);
        } else {
          // If the user document doesn't exist, create a new document with the provided user ID
          await setDoc(userDocRef, {
            transactions: [{
              symbol: symbol.toUpperCase(),
              quantity: quantity,
              price: price,
              totalPrice: totalPrice,
              sector: getSectorBySymbol(SymbolsList, symbol.toUpperCase()),
              date: new Date().toISOString().split('T')[0],//just date
              comment: comment,
              type: 'Buy'
            }],
            stockHoldings: [{
              symbol: symbol.toUpperCase(),
              quantity: Number(quantity),
              averagePrice: price,
              sector: getSectorBySymbol(SymbolsList, symbol.toUpperCase())
            }],
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
