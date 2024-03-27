import React from 'react'
import { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import app from "../../../database/firebase";
import { fetchUserData } from '../js file/instructor';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

export default function TransactionTable() {

    const [transactions, setTransactions] = useState([]);
    const db = getFirestore(app);

    const fetchTransactions = async () => {
        const transactionsCollectionRef = collection(db, 'transactions');

        try {
            const snapshot = await getDocs(transactionsCollectionRef);
            const transactionsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            return transactionsData;
        } catch (error) {
            console.error('Error fetching transactions:', error.message);
            return [];
        }
    };


    useEffect(() => {
        const fetchAndSetTransactions = async () => {
            const fetchedTransactions = await fetchTransactions();
            setTransactions(fetchedTransactions);
        };
        fetchAndSetTransactions();
    }, []);




    return (
        <>
            <h4
                class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300"
            >
                All Transactions
            </h4>
            <div class="w-full overflow-hidden rounded-lg shadow-xs">
                <div class="w-full overflow-x-auto">
                    <table class="w-full whitespace-no-wrap">
                        <thead>
                            <tr
                                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                            >
                                <th class="px-4 py-3">#</th>
                                <th class="px-4 py-3">Title</th>
                                <th class="px-4 py-3">catagory</th>
                                <th class="px-4 py-3">Amount Paid</th>
                                <th class="px-4 py-3">Date</th>
                                <th class="px-4 py-3">Gateway</th>
                            </tr>
                        </thead>
                        <tbody
                            class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                        >
                            {transactions.map((transaction, index) => (

                                <tr class="text-gray-700 dark:text-gray-400"
                                    key={transaction.id}>
                                   
                                    <td class="px-4 py-3 text-sm">
                                        {(index+1)}
                                    </td>
                                    {/* <td class="px-4 py-3 text-xs">
                                        <span
                                            className={`px-2 py-1 font-semibold leading-tight rounded-full ${user.status
                                                ? 'text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100'
                                                : 'text-red-700 bg-red-100 dark:bg-red-700 dark:text-red-100'
                                                }`}
                                        >
                                            {user.status ? 'approved' : 'not approved'}
                                        </span>
                                    </td> */}
                                      <td class="px-4 py-3 text-sm">
                                    {transaction.title}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                    {transaction.type}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                    {transaction.price}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                    {transaction.date}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                    {transaction.gateway}
                                    </td>
                                    

                                   
                                </tr>


                            ))}
                        </tbody>
                    </table>
                </div>
                <div
                    class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
                >
                    <span class="flex items-center col-span-3">
                        Showing 21-30 of 100
                    </span>
                    <span class="col-span-2"></span>
                    {/* <!-- Pagination --> */}
                    <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                        <nav aria-label="Table navigation">
                            <ul class="inline-flex items-center">
                                <li>
                                    <button
                                        class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                                        aria-label="Previous"
                                    >
                                        <svg
                                            class="w-4 h-4 fill-current"
                                            aria-hidden="true"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                clip-rule="evenodd"
                                                fill-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                                    >
                                        1
                                    </button>
                                </li>
                                <li>
                                    <button
                                        class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                                    >
                                        2
                                    </button>
                                </li>
                                <li>
                                    <button
                                        class="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple"
                                    >
                                        3
                                    </button>
                                </li>
                                <li>
                                    <button
                                        class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                                        aria-label="Next"
                                    >
                                        <svg
                                            class="w-4 h-4 fill-current"
                                            aria-hidden="true"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clip-rule="evenodd"
                                                fill-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </span>
                </div>

            </div>



        </>
    )
}



