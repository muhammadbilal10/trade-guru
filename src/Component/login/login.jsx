import React from "react";
import { useState } from "react";
import Navbar from "../navbar/navbar";


export default function Login() {
    return (
      <>
      <Navbar/>
      <section className="bg-[#20344A] h-screen">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto shadow-lg">
                   
                    <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Login to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required="">
                                    </input>
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                    
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="">
                                    </input>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                                            </input>
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>
                                
                                <button type="submit" className="border rounded-md outline-2 border-[#D9ECFF] bg-[#20344A] text-[#D9ECFF] w-full px-5 py-2.5 text-center ">Sign in</button>
                                <p className="text-sm font-light text-black ">
                                    Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline">Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
      </>
      );
  }