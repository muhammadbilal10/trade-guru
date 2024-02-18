import React from "react";
import { Link } from "react-router-dom";
export default function Optionbar() {
    return (
        <>
            <nav className="navbar bg-white h-16 text-yellow-500 flex justify-between items-center px-8 border-t border-b border-gray-300">
                <div className="flex items-center space-x-6">
                    <Link to='/portfolio_main_page'><button className="hover:bg-yellow-400 hover:text-white px-4 py-2 rounded-lg transition duration-300">Home</button></Link>
                    <Link to='/MarketSummaryPage'><button className="hover:bg-yellow-400 hover:text-white px-4 py-2 rounded-lg transition duration-300">Market summury</button></Link>
                    <Link to='/overview_page'><button className="hover:bg-yellow-400 hover:text-white px-4 py-2 rounded-lg transition duration-300">Overview</button></Link>
                    <Link to="/positions_page"><button className="hover:bg-yellow-400 hover:text-white px-4 py-2 rounded-lg transition duration-300">Positions</button></Link>
                    
                </div>
            </nav>
        </>
    );
}