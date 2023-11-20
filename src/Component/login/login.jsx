import React from "react";
import { useState } from "react";
import Navbar from "../navbar/navbar";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import app from "../../database/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const auth = getAuth(app);

    const originalEmail = 'admin'
    const originalPassword = 'admin'

    const handleLogin = () => {

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          navigate("/");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });

        // if (email === originalEmail && password === originalPassword) {
        //     navigate("/");
        // }
        // else {
        //     alert("Authentication Failed!");

    
        //}
    }

   

    // const handleSignUp = async () => {
    //     try {
    //         await auth.createUserWithEmailAndPassword(email, password);
    //         console.log('User signed up successfully!');
    //     } catch (error) {
    //         console.error('Error signing up:', error.message);
    //     }
    // };
    return (
        <>
            <Navbar />
            <section className="bg-[#20344A] h-screen">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto shadow-lg">

                    <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Login to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={(e)=>e.preventDefault()}>
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required=""value={email} onChange={(e) => { setEmail(e.target.value) }}>
                                    </input>
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>

                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" value={password} onChange={(e) => { setPassword(e.target.value) }}>
                                    </input>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" >
                                            </input>
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>

                                <button type="submit" className="border rounded-md outline-2 border-[#D9ECFF] bg-[#20344A] text-[#D9ECFF] w-full px-5 py-2.5 text-center " onClick={handleLogin}>Sign in</button>
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