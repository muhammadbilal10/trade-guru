import React from "react";
import { useState } from "react";
import Navbar from "../navbar/navbar";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import app from "../../database/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
// //totste
import '../../../node_modules/react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
//import { ToastContainer, toast } from "react-toastify";



export default function TempLogin() {
    const [error_email, setError_email] = useState({
        status: false,
        message: ''
    })
    const [error_password, setError_password] = useState({
        status: false,
        message: ''
    })

    const navigate = useNavigate();
    const auth = getAuth(app);
    const cookies = new Cookies();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const ToastemailError = () => {
        toast.error("Invalid email format!", {
            position: "top-right",
            className: "toast-message",
        });
    };
    const ToastPasswordError = () => {
        toast.error("invalid password", {
            position: "top-right",
            className: "toast-message",
        });
    };

    const ToastInvalidCredentialError = () => {
        toast.error("Invalid Credential", {
            position: "top-right",
            className: "toast-message",
        });
    };


    const handleLogin = () => {
        // Check if email is in valid format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            ToastemailError();
            setEmail('');
            setPassword('');
            setError_email({
                status: true,
                message: 'Invalid email format!'
            });

            return;
        }

        // Check if password meets minimum length requirement
        if (password.length < 6) {
            ToastPasswordError();
            setEmail('');
            setPassword('');
            setError_password({
                status: true,
                message: 'Password must be at least 6 characters long!'
            });
            return;
        }

        // Clear any previous errors
        setError_password({
            status: false,
            message: ''
        });
        setError_email({
            status: false,
            message: ''
        });

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const uid = user.uid;
                console.log(user);
                // setIsLoggedIn(true);
                cookies.set('userId', uid);
                cookies.set('islogin', true);
                navigate("/");
            })
            .catch((error) => {

                if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                    ToastInvalidCredentialError();
                    setEmail('');
                    setPassword('');
                    setError_email({
                        status: true,
                        message: 'Invalid email'
                    });
                    setError_password({
                        status: true,
                        message: 'Password must be at least 6 characters long!'
                    });

                } else {
                    alert("An error occurred. Please try again later.");
                }
            });
    };

    return (
        <>
            <ToastContainer />
            <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900" onSubmit={(e) => e.preventDefault()}>
                <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                    <div class="flex flex-col overflow-y-auto md:flex-row">
                        <div class="h-32 md:h-auto md:w-1/2">
                            <img
                                aria-hidden="true"
                                class="object-cover w-full h-full dark:hidden"
                                src="https://www.investopedia.com/thmb/6yT9a8ymacj5LQMsBC5ty5OZseY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TradingPlatforms_Chervov-dfe01706a3c5463aaa96883cc36e8722.jpg"
                                alt="Office Office"
                            />
                            <img
                                aria-hidden="true"
                                class="hidden object-cover w-full h-full dark:block"
                                src="https://www.investopedia.com/thmb/6yT9a8ymacj5LQMsBC5ty5OZseY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TradingPlatforms_Chervov-dfe01706a3c5463aaa96883cc36e8722.jpg"
                                alt="Office"
                            />
                        </div>
                        <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                            <div class="w-full">
                                <h1 class="mb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
                                    Login
                                </h1>
                                <label class="block text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">Email</span>
                                    <input
                                        class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                        placeholder="xyz@gmail.com"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }} />
                                </label>

                                {

                                    error_email?.status &&
                                    <p className="text-red-500 text-xs">{error_email?.message}</p>

                                }
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
                                    error_password?.status &&
                                    <p className="text-red-500 text-xs">{error_password?.message}</p>
                                }
                                <button
                                    class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                    onClick={handleLogin}
                                >
                                    Log in
                                </button>

                                <hr class="my-8" />
                                <Link to={'/'}>
                                    <p class="mt-4">
                                        <button class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline focus:outline-none">
                                            Forgot your password?
                                        </button>
                                    </p>
                                </Link>
                                <Link to={'/'}>
                                    <p class="mt-1">
                                        <button class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline focus:outline-none">
                                            Create account
                                        </button>
                                    </p>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}