import { React, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import app from '../../database/firebase';
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export default function OverviewCard() {

    const cookies = new Cookies();
    const [userId, setUserId] = useState(cookies.get('userId'));
    const db = getFirestore(app);
    const [NetWorth,  setNetWorth] = useState(0);
    const [Balance, setBalance] = useState();
    const [cashInHand, setCashInHand] = useState();
    const [TotalGainLoss,  setTotalGainLoss] = useState();
   useEffect(() => {
    const fetchdata = async () => {
        try {
            const userDocRef = doc(db, 'portfolio', userId);
            const userDocSnap = await getDoc(userDocRef);
            const data = userDocSnap.data().wallet;
            console.log(data);
            setBalance(data.balance);
            setCashInHand(data.cash_in_hand);
            setNetWorth(data.net_worth);
            setTotalGainLoss(data.total_gain_loss);
          

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
                        <span className="text-black">{Balance}</span>
                    </div>
                    <div className="mb-2">
                        <p className="text-lg text-gray-600">cash in hand:</p>
                        <span className="text-green-600">{cashInHand}</span>
                    </div>
                    <div>
                        <p className="text-gray-600">Today's Loss:</p>
                        <span className="text-red-600">{TotalGainLoss}</span>
                    </div>
                </div>

            </div>


        </>
    );
}