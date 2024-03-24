import { React, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import app from '../../database/firebase';
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export default function OverviewCard() {

    const cookies = new Cookies();
    const [userId, setUserId] = useState(cookies.get('userId'));
    const db = getFirestore(app);
    const [data,  setData] = useState([]);
   
   useEffect(() => {
    const fetchdata = async () => {
        try {
            const userDocRef = doc(db, 'portfolio', userId);
            const userDocSnap = await getDoc(userDocRef);
            const data = userDocSnap.data().wallet;
            console.log(data);
            setData(data);
            console.log(data);
            
          

        } catch (error) {
          console.error('Error=>:', error);
        }
    }
    fetchdata();
    }, []);

    return (
        <>
            <div className="p-6">

                <div className="bg-gray-50 shadow-md p-6 rounded-lg w-80">
                    <div className="text-lg font-semibold mb-2">Account Summary</div>

                    <div className="mb-2 ">
                        <p className="text-lg text-gray-600">Account Value:</p>
                        <span className="text-black">{data.net_worth}</span>
                    </div>
                    <div className="mb-2">
                        <p className="text-lg text-gray-600">cash in hand:</p>
                        <span className="text-green-600">{data.cash_in_hand}</span>
                    </div>
                    <div>
                        <p className="text-gray-600">Today's Loss:</p>
                        <span className="text-red-600">{data.net_worth}</span>
                    </div>
                </div>

            </div>


        </>
    );
}