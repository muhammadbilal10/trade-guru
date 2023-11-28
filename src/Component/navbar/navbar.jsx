import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import TempLogin from "../login/Templogin";

export default function Navbar() {

    return (
        <>

            <nav className="navbar bg-[#142941] h-16 text-[#D9ECFF] flex justify-between basis-3">
                <a href="" className="flex items-center ml-8">
                    <span >Trade</span>
                    <span className="text-[#21B573]">Guru.pk</span>
                </a>
                <div className="flex items-center space-x-6 navbar-links">
                    <Link to={'/'}>
                        <button>Home</button>
                    </Link>
                    <Link to='/course' >
                        <button>course</button>
                    </Link>
                    <Link to={'/Regesteration'}>
                        <button>Regesteration</button>
                    </Link>
                    <Link to={'/dashboard'}>
                        <button>Dashboard</button>
                    </Link>
                    <button>learn</button>
                    <button>stocks</button>
                    <button>Portfolio</button>
                </div>
                <div className="flex items-center space-x-4 mr-8 navbar-auth">
                    {/* {isLoggedIn ? (
                        // User is logged in, show a welcome message
                        <div>
                            <h2>hello ustad g</h2>
                        </div>
                    ) : (
                        // User is not logged in, show login and signup buttons
                        <div>
                            <Link to={'/login'}>
                                <button className="border rounded-md outline-2 w-20 border-[#D9ECFF]" >Login</button>
                            </Link>
                            <Link to='/signup'>
                                <button className="border rounded-md outline-2 w-20  border-[#D9ECFF]">Signup</button>
                            </Link>
                        </div>
                    )} */}
                    <Link to={'/login'}>
                        <button className="border rounded-md outline-2 w-20 border-[#D9ECFF]" >Login</button>
                    </Link>
                    <Link to='/signup'>
                        <button className="border rounded-md outline-2 w-20  border-[#D9ECFF]">Signup</button>
                    </Link>
                    <Link to={'/instructoform'}>
                        <button className="border rounded-md outline-2 w-20  border-[#D9ECFF]">become instructor</button>
                    </Link>
                </div>
            </nav>
        </>
    );
}




{/* <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                        hello
                    </a>

           


            <div className="bg-[#142941] h-screen">
               <section className="bg-[#20344A]  w-96 h-96 rounded-lgr">
                <div className="text-[#D9ECFF] flex flex-col flex items-center">
                    <h1>login</h1>
                    <input></input>
                </div>




*/}