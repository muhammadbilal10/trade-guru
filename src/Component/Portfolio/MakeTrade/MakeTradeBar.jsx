import { React, useState, useEffect } from 'react';
import app from '../../../database/firebase';
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getprice, getchange, getSectorBySymbol, Is_symbol_exist } from '../apiFuntion/api_funtion';
import BuyModal from './BuyModal';
import SellModal from './SellModal';
import { PiChartLineUpBold, PiChartLineDownBold } from "react-icons/pi";
import { MdAccessTimeFilled } from "react-icons/md";



import { Combobox } from '@headlessui/react'


export default function TradeBar() {
    const [symbol, setSymbol] = useState('HBL');
    const [quantity, setQuantity] = useState(0);
    const [quantityToSell, setQuantityToSell] = useState(0);
    const [price, setPrice] = useState(0);
    const [change_percent, setPercent] = useState(0);
    const [change_value, setValue] = useState(0);
    const [symbolsList, setSymbolsList] = useState([]);

    const [userId, setUserId] = useState('RvITOTp9JrsehfH8iGcq');
    const db = getFirestore(app);
    ////////Modal////////////
    const [IsBuyOpen, setIsBuyOpen] = useState(false)
    const [IsSellOpen, setIsSellOpen] = useState(false)
    // Function to handle delete button click
    const handleBuy = () => {
        setIsBuyOpen(true);
    };
    const handleSell = () => {

        setIsSellOpen(true);
    };
    useEffect(() => {
        const fetch_symbol = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/get_symbol');
                if (!response.ok) {
                    throw new Error('Failed to fetch symbols');

                }
                const data = await response.json();
                console.log(data);
                setSymbolsList(data);

            } catch (error) {
                console.error('Error fetching symbols:', error.message);
            }
        };

        const temp = async () => {
            const change = await getchange('HBL');
            setPercent(change[2]);
            setValue(change[1]);
            setPrice(change[0]);
        }
        fetch_symbol();
        temp();
    }, []);



    const [selectedSymbol, setSelectedSymbol] = useState('');
    const [query, setQuery] = useState('');

    // Function to filter symbols based on the query
    const filterSymbols = (query) => {
        return symbolsList.filter((symbolObj) =>
            symbolObj.symbol.toLowerCase().includes(query.toLowerCase())
        );
    };

    // Update the symbols list based on the query
    const filteredSymbols = filterSymbols(query);

    return (
        <>
            {/* Trade Section */}
            <div className="w-2/12 bg-gray-100 overflow-y-auto flex flex-col justify-between p-4 rounded">
                <input className="p-2 bg-gray-200 mb-4 border border-gray-300 rounded"
                    type="text"
                    placeholder="Symbol"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                />

                <Combobox value={selectedSymbol} onChange={setSelectedSymbol}>
                    <Combobox.Input
                        onChange={(event) => setQuery(event.target.value)}
                        value={query}
                        placeholder="Search symbols..."
                    />
                    <Combobox.Options>
                        {filteredSymbols.map((symbolObj, index) => (
                            <Combobox.Option key={index} value={symbolObj.symbol}>
                                {symbolObj.symbol}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </Combobox>

                <input className="p-2 bg-gray-200 mb-4 border border-gray-300 rounded"
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <div className="bg-gray-200 p-4 rounded">
                    <p className="text-gray-700 font-semibold">Price: (Rs.) {price}</p>
                    <p className={`text-gray-700 ${change_percent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        Change (%): {change_percent}
                    </p>
                    <p className={`text-gray-700 ${change_value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        Change (Rs.): {change_value}
                    </p>
                </div>

                {/* Trade Buttons */}
                <div className="flex flex-col justify-end space-y-2">
                    <button
                        className="flex flex-col items-center justify-center p-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleBuy}>
                        <PiChartLineUpBold size={24} className="mr-2" />
                        <span className="text-lg font-bold">BUY</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={handleSell}>
                        <PiChartLineDownBold size={24} className="mr-2" />
                        <span className="text-lg font-bold">SELL</span>
                    </button>

                    <button className=" flex flex-col items-center justify-center p-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                        <MdAccessTimeFilled size={24} className="mr-2" />
                        <span className="text-lg font-bold"> SHORT</span>
                    </button>
                </div>
                {/* buy modal */}
                {
                    IsBuyOpen &&
                    <BuyModal isOpen={IsBuyOpen} setIsOpen={setIsBuyOpen} symbol={symbol} quantity={quantity} setPrice={setPrice} setPercent={setPercent} setValue={setValue} SymbolsList={symbolsList} />
                }
                {/* sell modal */}
                {

                    <SellModal isOpen={IsSellOpen} setIsOpen={setIsSellOpen} symbol={symbol} quantity={quantity} SymbolsList={symbolsList} />
                }
            </div>
        </>

    );
};
