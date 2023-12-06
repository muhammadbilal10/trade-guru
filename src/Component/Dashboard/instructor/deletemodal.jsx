import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import app from "../../../database/firebase";
import { getFirestore,doc, deleteDoc } from 'firebase/firestore';

export default function DeleteModal({ IsDelOpen, setIsDelOpen ,id, setId}) {
    //let [isOpen, setIsOpen] = useState(true)
    const db = getFirestore(app);

    // Function to handle delete confirmation
    const handleDeleteConfirm = async (uid) => {
        const collectionName = 'Instructor'; // Replace with the actual name of your Firestore collection

        try {
            console.log(id);
            // Create a reference to the document with the provided UID
            const documentRef = doc(db, collectionName, uid);

            // Delete the document
            await deleteDoc(documentRef);
            window.location.reload();

            console.log(`Document with UID ${uid} deleted successfully!`);
        } catch (error) {
            console.error('Error deleting document:', error.message);
        }

        // Close the delete modal
        setIsDelOpen(false);

        // Optionally, reset the uid state to null
        setUid(null);
    };
    return (
        <Dialog
            open={IsDelOpen}
            onClose={() => setIsDelOpen(false)}
            className="relative z-50"
        >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                {/* The actual dialog panel  */}
                <Dialog.Panel className="mb-4 text-lg font-semibold p-8 bg-white text-gray-600 dark:text-gray-300">
                    <div class="mt-4 mb-6">

                        <p
                            class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300"
                        >
                            Delete user
                        </p>

                        <p class="text-sm text-gray-700 dark:text-gray-400">
                            Press confirm  to delete this user
                        </p>
                    </div>
                    <footer
                        class="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800"
                    >
                        <button

                            class="w-full px-5 py-3 text-sm font-medium leading-5 text-white text-gray-700 bg-red-600 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                            onClick={() => handleDeleteConfirm(id)}
                        >
                            confirm delete
                        </button>
                        <button
                            class="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                        >
                            cancel
                        </button>
                    </footer>




                    {/* ... */}
                </Dialog.Panel >
            </div >
        </Dialog >
    )
}

