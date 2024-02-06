
import React from 'react';
import Navbar from '../navbar/navbar';
import Cookies from 'universal-cookie';

export default function Home() {

    const cookies = new Cookies();
    console.log(cookies.get('uid'));
    console.log(cookies.get('uid'));
    return (
        <div className="bg-gradient-to-r from-purple-600 to-blue-900 min-h-screen flex flex-col text-white">
            <Navbar />

            <div className="container mx-auto py-10 px-4 animate-fade-in-up">
                <h1 className="text-5xl font-bold text-center mb-12 animate-pulse">Explore the World of tading</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="transform hover:scale-105 transition duration-500 ease-in-out p-6 bg-purple-500 rounded-lg shadow-xl">
                        <h2 className="font-bold text-3xl mb-3">Learn trading Basics</h2>
                        <p>Understand the fundamentals of technical analysis.</p>
                    </div>

                    <div className="transform hover:scale-105 transition duration-500 ease-in-out p-6 bg-purple-500 rounded-lg shadow-xl">
                        <h2 className="font-bold text-3xl mb-3">Advanced Trading Strategies</h2>
                        <p>Explore advanced concepts and trading strategies for forex markets.</p>
                    </div>

                    <div className="transform hover:scale-105 transition duration-500 ease-in-out p-6 bg-purple-500 rounded-lg shadow-xl">
                        <h2 className="font-bold text-3xl mb-3">Market Analysis</h2>
                        <p>Analyze  markets for informed investment decisions.</p>
                    </div>

                    <div className="transform hover:scale-105 transition duration-500 ease-in-out p-6 bg-purple-500 rounded-lg shadow-xl">
                        <h2 className="font-bold text-3xl mb-3">Community Forum</h2>
                        <p>Join our forum to discuss and share insights with trading enthusiasts.</p>
                    </div>
                </div>
            </div>
        </div>
    );

}
