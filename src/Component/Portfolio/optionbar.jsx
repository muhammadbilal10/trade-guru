import React from "react";
import { Link } from "react-router-dom";
export default function Optionbar() {
    return (
        <>

            <nav className="navbar bg-gradient-to-r from-purple-600 to-blue-900 h-16 text-white flex justify-between items-center px-8">
                <div className="flex items-center space-x-6">
                    <Link to={'/'}><button className="hover:scale-110 transform transition duration-300">Home</button></Link>
                    <Link to="/temp_page"><button className="hover:scale-110 transform transition duration-300">temp page</button></Link>
                    

                </div>

            </nav>


        </>
    );
}















