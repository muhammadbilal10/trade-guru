import React from "react";
import { useState } from "react";
import Navbar from "../navbar/navbar";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import app from "../../database/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Cookies from 'universal-cookie';

export default function TempLogin() {
    const [error, setError] = useState({
        status: false,
        message: ''
    })
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth(app);
    const cookies = new Cookies();
    const handleLogin = () => {
        setError({
            status: false,
            message: 'Invalid Password!'
        })
        if (email == "admin@gmail.com" && password == "admin") {
            navigate("/dashboard");

        }
        else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    const uid = user.uid;
                    console.log(user);
                    setIsLoggedIn(true);
                    
                    cookies.set('uid', uid);
                    console.log(cookies.get('uid')); 
                    navigate("/");
                    // ...
                })
                .catch((error) => {
                    console.log("wrong password");
                    setError({
                        status: true,
                        message: 'Invalid Password!'
                    })
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }

    }
    return (
        <>
            <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900" onSubmit={(e) => e.preventDefault()}>
                <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                    <div class="flex flex-col overflow-y-auto md:flex-row">
                        <div class="h-32 md:h-auto md:w-1/2">
                            <img
                                aria-hidden="true"
                                class="object-cover w-full h-full dark:hidden"
                                src={'/assets/img/login-office.jpeg'}
                                alt="Office Office" />
                            <img
                                aria-hidden="true"
                                class="hidden object-cover w-full h-full dark:block"
                                src="/assets/img/login-office-dark.jpeg"
                                alt="Office" />
                        </div>
                        <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                            <div class="w-full">
                                <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                                    Login
                                </h1>
                                <label class="block text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">Email</span>
                                    <input
                                        class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                        placeholder="xyz@gmial.com"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }} />
                                </label>
                                <label class="block mt-4 text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">Password</span>
                                    <input
                                        class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                        placeholder="***************"
                                        type="password"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                </label>
                                {
                                    error?.status &&
                                    <p className="text-red-500 text-xs">{error?.message}</p>
                                }
                                <button
                                    class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                    onClick={handleLogin}
                                >
                                    Log in
                                </button>

                                <hr class="my-8" />



                                <p class="mt-4">
                                    <a class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                                        href="./forgot-password.html">
                                        Forgot your password?
                                    </a>
                                </p>
                                <p class="mt-1">
                                    <a class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                                        href="./create-account.html"
                                    >
                                        Create account
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}