import { getFirestore, collection, getDocs } from 'firebase/firestore';

export const fetchUserData = async (db,table) => {
    try {
        const peopleCollection = collection(db, table); // Replace 'your_collection_name' with the actual name of your collection
        const snapshot = await getDocs(peopleCollection);

        const peopleData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        //setInstructor(peopleData);
        return peopleData;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};