import React from "react";
import { useState } from "react";
import Navbar from "../navbar/navbar";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import app from "../../database/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";


export default function Signup() {

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phn, setPhn] = useState('');
    const [profession , setProfession ] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const auth = getAuth(app);
    const db = getFirestore(app);
    const handlesignup = () => {

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                const uid = user.uid;
                addNewDocument(uid);
                navigate("/");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

        const addNewDocument = async (uid) => {
            try {
                const collectionRef = doc(db, "User", uid);
                await setDoc(collectionRef, {
                    first_name: fname,
                    last_name: lname,
                    email: email,
                    id: uid,
                    phn: phn,
                    occupation : profession,
                    
                });

                console.log('Document added with custom ID: ', customDocId);
            } catch (error) {
                console.error('Error adding document with custom ID: ', error);
            }
        }


    }

    return (
        <>
            <Navbar />
            <form className="bg-white w-1/2  rounded-lg px-6 py-8 mx-auto shadow-lg " onSubmit={(e) => e.preventDefault()}>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    Fill the form
                </h1>
                <div class="relative z-0 w-full mb-6 group">
                    <input type="email"
                        name="floating_email"
                        id="floating_email"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }} />
                    <label for="floating_email"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Email address</label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input type="password"
                        name="floating_password"
                        id="floating_password"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }} />
                    <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >
                        Password</label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input
                        type="password"
                        name="repeat_password"
                        id="floating_repeat_password"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " required />
                    <label
                        for="floating_repeat_password"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Confirm password</label>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            name="floating_first_name"
                            id="floating_first_name"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required 
                            value={fname}
                            onChange={(e) => { setFname(e.target.value) }}/>
                        <label
                            for="floating_first_name"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            First name
                        </label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="text"
                            name="floating_last_name"
                            id="floating_last_name"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required 
                            value={lname}
                            onChange={(e) => { setLname(e.target.value) }}/>
                        <label
                            for="floating_last_name"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Last name
                        </label>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="tel"
                            pattern="[0-9]{4}-[0-9]{7}"
                            name="floating_phone"
                            id="floating_phone"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " 
                            required 
                            value={phn}
                            onChange={(e) => { setPhn(e.target.value) }}/>
                        <label
                            for="floating_phone"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Phone number (03xx-xxxxxxx)
                        </label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="text"
                            name="floating_company"
                            id="floating_company"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required 
                            value={profession}
                            onChange={(e) => { setProfession(e.target.value) }}/>
                        <label for="floating_company"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Company (Ex. Google)
                        </label>
                    </div>
                </div>
                <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handlesignup}>Submit
                </button>
            </form>

        </>
    );
}