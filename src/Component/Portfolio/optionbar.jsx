import React from "react";
import { Link } from "react-router-dom";

export default function Optionbar() {
    // Define an array of navigation links
    const navLinks = [
        { path: '/portfolio_main_page', text: 'Home' },
        { path: '/portfolio_main_page', text: 'Market Summary' },
        { path: '/tradePage', text: 'Trade' },
        { path: '/overview_page', text: 'Overview' },
        { path: '/positions_page', text: 'Positions' },
        { path: '/transactionPage', text: 'Transaction' }
    ];

    return (
        <nav className="navbar bg-white h-16 text-primary flex justify-between items-center px-8 border-t border-b border-gray-300">
            <div className="flex items-center space-x-6">
                {navLinks.map((link, index) => (
                    <Link to={link.path} key={index}>
                        <button className="hover:bg-primary hover:text-white text-black px-4 py-2 rounded-lg transition duration-300">
                            {link.text}
                        </button>
                    </Link>
                ))}
            </div>
        </nav>
    );
}
