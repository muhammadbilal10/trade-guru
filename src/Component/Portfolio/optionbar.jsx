import React from "react";
import { Link } from "react-router-dom";
export default function Optionbar() {
    return (
        <>

            {/* <nav className="navbar bg-gradient-to-r from-purple-600 to-blue-900 h-16 text-white flex justify-between items-center px-8">
                <div className="flex items-center space-x-6">
                    <Link to={'/'}><button className="hover:scale-110 transform transition duration-300">Home</button></Link>
                    <Link to="/positions_page"><button className="hover:scale-110 transform transition duration-300">positions</button></Link>
                    <Link to='/trade'><button className="hover:scale-110 transform transition duration-300">trade</button></Link>
                    

                </div>

            </nav> */}

            <nav className="navbar bg-white h-16 text-yellow-500 flex justify-between items-center px-8 border-t border-gray-300">
                <div className="flex items-center space-x-6">
                    <Link to={'/'}><button className="hover:bg-yellow-400 hover:text-white px-4 py-2 rounded-lg transition duration-300">Home</button></Link>
                    <Link to="/positions_page"><button className="hover:bg-yellow-400 hover:text-white px-4 py-2 rounded-lg transition duration-300">Positions</button></Link>
                    <Link to='/trade'><button className="hover:bg-yellow-400 hover:text-white px-4 py-2 rounded-lg transition duration-300">Trade</button></Link>
                </div>
            </nav>




        </>
    );
}















