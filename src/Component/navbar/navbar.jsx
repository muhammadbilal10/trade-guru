import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <nav className="navbar bg-gradient-to-r from-purple-600 to-blue-900 h-16 text-white flex justify-between items-center px-8">
                <a href="/" className="flex items-center space-x-1">
                    <span>Trade</span>
                    <span className="text-[#21B573]">Guru.pk</span>
                </a>
                <div className="flex items-center space-x-6">
                    <Link to={'/'}><button className="hover:scale-110 transform transition duration-300">Home</button></Link>
                    <Link to='/course'><button className="hover:scale-110 transform transition duration-300">Course</button></Link>
                    <Link to={'/Regesteration'}><button className="hover:scale-110 transform transition duration-300">Registration</button></Link>
                    <Link to={'/dashboard'}><button className="hover:scale-110 transform transition duration-300">Dashboard</button></Link>
                    <Link to={'/Makepayment'}><button className="hover:scale-110 transform transition duration-300">Make Payemnt</button></Link>
                    <Link to={'/terminal'}><button className="hover:scale-110 transform transition duration-300">Stocks</button></Link>
                    <Link to={'/portfolio_main_page'}><button className="hover:scale-110 transform transition duration-300">Portfolio</button></Link>

                
                </div>
                <div className="flex items-center space-x-4">
                    <Link to={'/login'}>
                        <button className="border rounded-md px-4 py-1 border-white hover:bg-white hover:text-blue-900 transition duration-300">Login</button>
                    </Link>
                    <Link to='/signup'>
                        <button className="border rounded-md px-4 py-1 border-white hover:bg-white hover:text-blue-900 transition duration-300">Signup</button>
                    </Link>
                    <Link to={'/instructorform'}>
                        
                        <button className="border rounded-md px-4 py-1 border-white hover:bg-white hover:text-blue-900 transition duration-300">Become Instructor</button>
                    </Link>
                </div>
            </nav>
        </>
    );
}