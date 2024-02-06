
import React from 'react';
import Navbar from '../navbar/navbar';
import Cookies from 'universal-cookie';

export default function Payment() {


    return (
        <>

            <Navbar />

            (
            <div className="bg-purple-200 p-8">
                <h1 className="text-6xl font-bold mb-6 text-center">Secure Payment Information</h1>

                <div className="mb-3 flex -mx-2">
                    <div className="px-2">
                        <label htmlFor="type1" className="flex items-center cursor-pointer">
                            <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type1" checked />
                            <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" alt="Card 1" className="h-13 ml-3" />
                        </label>
                    </div>
                    <div className="px-2">
                        <label htmlFor="type2" className="flex items-center cursor-pointer">
                            <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type2" />
                            <img src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png" alt="Card 2" className="h-11 ml-2" />
                        </label>
                    </div>
                </div>

                <div className="mb-6 flex -mx-2">
                    <div className="px-2">
                        <input type="radio" className="card-type-input hidden" name="type" id="type1" checked />
                        <label htmlFor="type1" className="card-type-label flex items-center cursor-pointer transition-all duration-300 transform">
                            <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" alt="Card 1" className="h-13 ml-3 filter grayscale" />
                        </label>
                    </div>
                    <div className="px-2">
                        <input type="radio" className="card-type-input hidden" name="type" id="type2" />
                        <label htmlFor="type2" className="card-type-label flex items-center cursor-pointer transition-all duration-300 transform">
                            <img src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png" alt="Card 2" className="h-11 ml-2 filter grayscale" />
                        </label>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="font-bold text-lg mb-2 ml-1 text-center">Name on card</label>
                    <div>
                        <input className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-black focus:border-indigo-500 transition-colors" placeholder="John Smith" type="text" />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="font-bold text-lg mb-2 ml-1 text-center">Card number</label>
                    <div>
                        <input className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-black focus:border-indigo-500 transition-colors" placeholder="0000 0000 0000 0000" type="text" />
                    </div>
                </div>
                <div className="mb-3 -mx-2 flex items-end">
                    <div className="px-2 w-1/2">
                        <label className="font-bold text-lg mb-2 ml-1 text-center">Expiration date</label>
                        <div>
                            <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-black focus:border-indigo-500 transition-colors cursor-pointer">
                                <option value="01">01 - January</option>
                                
                            </select>
                        </div>
                    </div>
                    <div className="px-2 w-1/2">
                        <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-black focus:border-indigo-500 transition-colors cursor-pointer">
                            <option value="2020">2020</option>
                            {/* Add other options for years */}
                        </select>
                    </div>
                </div>
                <div className="mb-10">
                    <label className="font-bold text-lg mb-2 ml-1 text-center">Security code</label>
                    <div>
                        <input className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-black focus:border-indigo-500 transition-colors" placeholder="000" type="text" />
                    </div>
                </div>
                <div>
                    <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"><i className="mdi mdi-lock-outline mr-1"></i> PAY NOW</button>
                </div>
            </div>

        </>
    );


}
