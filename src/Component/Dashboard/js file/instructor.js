import { getFirestore, collection, getDocs } from 'firebase/firestore';

export const fetchUserData = async (db,table) => {
    try {
        const peopleCollection = collection(db, table); 
        const snapshot = await getDocs(peopleCollection);

        const peopleData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return peopleData;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};


