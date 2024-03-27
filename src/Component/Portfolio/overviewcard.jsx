import { React, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import app from '../../database/firebase';
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export default function OverviewCard() {

    const cookies = new Cookies();
    const [userId, setUserId] = useState(cookies.get('userId'));
    const db = getFirestore(app);
    const [data, setData] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const userDocRef = doc(db, 'portfolio', userId);
                const userDocSnap = await getDoc(userDocRef);
                const data = userDocSnap.data().wallet;
                console.log(data);
                setData(data);
            } catch (error) {
                console.error('Error=>:', error);
            }
        }
        const fetchUserName = async () => {
            try {
                const userDocRef = doc(db, 'User', userId);
                const userDocSnap = await getDoc(userDocRef);
                const userData = userDocSnap.data();

                if (userData) {
                    const name = userData.fname;

                    setName(name);
                } else {
                    console.error('User document not found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };


        fetchdata();
        fetchUserName();
    }, []);

    return (
        <>
            <div className="p-4">
                <div className="bg-gray-50 shadow-md p-6 rounded-lg w-80">
                    <div className="text-lg font-semibold mb-2">Account Summary</div>

                    {/* Add greeting with user's name */}
                    <div className="mb-4">
                        <p className="text-lg text-gray-600">Hello, {name}!</p>
                    </div>

                    {/* Display account value */}
                    <div className="mb-4">
                        <p className="text-lg text-gray-600">Account Value:</p>
                        <span className="text-black">{data.net_worth}</span>
                    </div>

                    {/* Display cash in hand */}
                    <div className="mb-4">
                        <p className="text-lg text-gray-600">Cash in Hand:</p>
                        <span className="text-green-600">{data.cash_in_hand}</span>
                    </div>

                    {/* Display today's loss */}
                    <div>
                        <p className="text-lg text-gray-600">Today's Loss:</p>
                        <span className="text-red-600">{data.net_worth}</span> {/* Change this to display actual loss */}
                    </div>
                </div>
            </div>



        </>
    );
}