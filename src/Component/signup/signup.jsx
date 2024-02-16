import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import app from "../../database/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import Cookies from 'universal-cookie';


export default function Signup() {

    const [fname, setFname] = useState(null);
    const [lname, setLname] = useState(null);
    const [email, setEmail] = useState();
    const [gender, setGender] = useState(null);
    const [uid, setUid] = useState(null);
    const [occupasion, setOccupasion] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [socialMedia, setSocialMedia] = useState([null]);
    const [password, setPassword] = useState(null);
    const [confirm_pass, setConfirm_pass] = useState(null);

    const cookies = new Cookies();
    const navigate = useNavigate();

    const auth = getAuth(app);
    const db = getFirestore(app);

    const addNewDocument = async (uid) => {
        try {
            const collectionRef = doc(db, "User", uid);
            await setDoc(collectionRef, {
                fname: fname,
                lname: lname,
                email: email,
                gender: gender,
                uid: uid,
                occupasion: occupasion,
                profilePicture: profilePicture,
                socialMedia: socialMedia,
                isInstructor: false
            });

            console.log('Document added with UID: ', uid);
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    }


    const validateSignUp = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.error('Invalid email address');
            return false;
        }
        if (password.length < 6) {
            console.error('Password must be at least 6 characters long');
            return false;
        }
        if (password !== confirm_pass) {
            console.error('Password and confirm password do not match');
            return false;
        }

        return true;
    }

    const handlesignup = () => {
        if (!validateSignUp()) {
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                const uid = user.uid;
                setUid(uid);
                addNewDocument(uid);
                cookies.set('userId', uid);
                cookies.set('islogin', true);
                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error signing up: ', errorMessage);
            });
    }


    return (
        <>
            <Navbar />
            <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900" onSubmit={(e) => e.preventDefault()}>
                <div className="flex-1 max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                    <div className="flex flex-col overflow-y-auto md:flex-row">
                        <div className="h-32 md:h-auto md:w-1/2">
                            <img
                                aria-hidden="true"
                                className="object-cover w-full h-full dark:hidden"
                                src="/assets/img/create-account-office.jpeg"
                                alt="Office"
                            />
                            <img
                                aria-hidden="true"
                                className="hidden object-cover w-full h-full dark:block"
                                src="/assets/img/create-account-office-dark.jpeg"
                                alt="Office"
                            />
                        </div>
                        <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                            <div className="w-full">
                                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                                    Create Account
                                </h1>
                                <label className="block text-sm">
                                    <span className="text-gray-700 dark:text-gray-400">First Name</span>
                                    <input
                                        className="block w-full mt-1 text-sm   focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                        placeholder="Enter your first name"
                                        required
                                        value={fname}
                                        onChange={(e) => setFname(e.target.value)}
                                    />
                                </label>
                                <label className="block mt-4 text-sm">
                                    <span className="text-gray-700 dark:text-gray-400">Last Name</span>
                                    <input
                                        className="block w-full mt-1 text-sm   focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                        placeholder="Enter your last name"
                                        required
                                        value={lname}
                                        onChange={(e) => setLname(e.target.value)}
                                    />
                                </label>
                                <label className="block mt-4 text-sm">
                                    <span className="text-gray-700 dark:text-gray-400">Gender</span>
                                    <select
                                        className="block w-full mt-1 text-sm   focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                        required
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value={null}>Not to Answer</option>
                                    </select>
                                </label>
                                <label className="block mt-4 text-sm">
                                    <span className="text-gray-700 dark:text-gray-400">Email</span>
                                    <input
                                        className="block w-full mt-1 text-sm   focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                        placeholder="Enter your email"
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </label>
                                <label className="block mt-4 text-sm">
                                    <span className="text-gray-700 dark:text-gray-400">Password</span>
                                    <input
                                        className="block w-full mt-1 text-sm   focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                        placeholder="Enter your password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </label>
                                <label className="block mt-4 text-sm">
                                    <span className="text-gray-700 dark:text-gray-400">Confirm Password</span>
                                    <input
                                        className="block w-full mt-1 text-sm   focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                        placeholder="Confirm your password"
                                        type="password"
                                        required
                                        value={confirm_pass}
                                        onChange={(e) => setConfirm_pass(e.target.value)}
                                    />
                                </label>
                                <div className="flex mt-6 text-sm">
                                    <label className="flex items-center dark:text-gray-400">
                                        <input
                                            type="checkbox"
                                            className="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                        />
                                        <span className="ml-2">
                                            I agree to the{' '}
                                            <span className="underline">privacy policy</span>
                                        </span>
                                    </label>
                                </div>
                                <button
                                    className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                    onClick={handlesignup}
                                >
                                    Create Account
                                </button>
                                <hr className="my-8" />
                                <button
                                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        {/* Github icon */}
                                    </svg>
                                    Github
                                </button>
                                <button
                                    className="flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        {/* Twitter icon */}
                                    </svg>
                                    Twitter
                                </button>
                                <p className="mt-4">
                                    <Link to="/login">
                                        <button
                                            className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                                        >
                                            Already have an account? Login
                                        </button>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}