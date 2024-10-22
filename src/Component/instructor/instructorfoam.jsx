import {React,useEffect,useState} from 'react'
import Navbar from '../navbar/navbar'
import { FaArrowRight } from "react-icons/fa";
import { doc, setDoc,getDoc,updateDoc,collection, addDoc   } from "firebase/firestore";
import app from '../../database/firebase';
import { getFirestore, Timestamp } from "firebase/firestore";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
export default function Instructorform() {

    
const navigate = useNavigate();
    
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [gender, setGender] = useState('');
    const [lang, setLang] = useState('');
    const [experience, setExperience] = useState('');
    const [about, setAbout] = useState('');
    const [address, setAddress] = useState('');

    const db = getFirestore(app);
    const cookies = new Cookies();
    const uid=cookies.get('userId')

    const getUserData = async (uid) => {
        try {
            const userDocRef = doc(db, 'User', uid); 
            const userDocSnap = await getDoc(userDocRef);
            
            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                return userData;
            } else {
                console.log('User document not found');
                return null;
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    };

    const handlesubmit = async () => {
        try {
            const docRef = doc(db, 'User', uid); 
            const currentDate = new Date();
            const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
            const data = {

                fname: fname,
                lname: lname,
                language: lang,
                experiance: experience,
                isInstructor: true,
                approval: false,
                address:address,
                about:about,
                totalCourse: 0,
                // occupasion: occupasion,
                // profilePicture: profilePicture,
                // socialMedia: socialMedia,
                date: formattedDate,
            };
            
            
             await updateDoc(docRef, data);
             navigate("/");
        console.log('Document updated successfully');
        } catch (error) {
            console.error('Error adding document:', error.message);
        }
    };



    useEffect(() => {
        const fetchUserData = async () => {
            try {
              
                const userData = await getUserData(uid); 
                if (userData) {
                    setFname(userData.fname || '');
                    setLname(userData.lname || '');
                    setGender(userData.gender || 'male');
                } else {
                    console.log('User data not found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []); 

    return (
        <>
        
            <Navbar />
            <div class="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden': isSideMenuOpen "
                onSubmit={(e) => e.preventDefault()}>

                <div class="flex flex-col flex-1 w-full">

                    <main class="h-full overflow-y-auto">
                        <div class="container px-6 mx-auto grid">
                            <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                                Instructor registration form
                            </h2>
                            {/* <!-- CTA --> */}
                            <a class="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple">
                                <div class="flex items-center">
                                    <svg
                                        class="w-5 h-5 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <span>Wellcome to registrations</span>
                                </div>
                                <FaArrowRight />
                            </a>
                            {/* <!-- General elements --> */}
                            <h1 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
                                Hello {fname}
                            </h1>

                            <div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                                {/* first name */}
                                <label class="block text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">First name</span>
                                    <input
                                        class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                        placeholder={fname}
                                        value={fname}
                                        readOnly // Add readOnly attribute to prevent user input
                                        // placeholder={fname}
                                        // required
                                        // value={fname}
                                        // onChange={(e) => { setFname(e.target.value) }}
                                    />

                                </label>

                                {/* Last name */}
                                <label class="block text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">Last name</span>
                                    <input
                                        class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                        placeholder="xyz"
                                        required
                                        value={lname}
                                        onChange={(e) => { setLname(e.target.value) }}
                                    />

                                </label>

                                <label class="block mt-4 text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">
                                        gender
                                    </span>
                                    <select
                                        class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                        required
                                        value={gender}
                                        onChange={(e) => { setGender(e.target.value) }}
                                    >
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>not to answar</option>
                                    </select>
                                </label>

                                <label class="block mt-4 text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">
                                        Language
                                    </span>
                                    <select
                                        class="block w-full  py-2 mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                        required
                                        value={lang}
                                        onChange={(e) => { setLang(e.target.value) }}
                                    >
                                        <option>Urdu</option>
                                        <option>English</option>
                                        <option>Punjabi</option>
                                        <option>Arabic</option>
                                    </select>
                                </label>

                                <label class="block text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">Experiance</span>
                                    <input
                                        class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                        placeholder=">0"
                                        pattern="[0-9]{2}"
                                        required
                                        value={experience}
                                        onChange={(e) => { setExperience(e.target.value) }}
                                    />

                                </label>

                                <label class="block mt-4 text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">Adress</span>
                                    <textarea
                                        class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                        rows="2"
                                        placeholder="h#88, st#1 model city faislabad"
                                        value={address}
                                        onChange={(e) => { setAddress(e.target.value) }}
                                    ></textarea>
                                </label>


                                <label class="block mt-4 text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">Write somthing about your self</span>
                                    <textarea
                                        class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                        rows="3"
                                        placeholder="Brifly explain about yourself"
                                        value={about}
                                        onChange={(e) => { setAbout(e.target.value) }}
                                    ></textarea>
                                </label>


                                <div>
                                    <button
                                        class="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                        onClick={handlesubmit}
                                    >
                                        submit
                                    </button>
                                </div>
                            </div>



                        </div>
                    </main>
                </div>
            </div>




        </>

    )
}











