import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const AdsImageUpload = ({ nextStep, setImageUrl }) => {
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const uploadImage = () => {
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    setIsUploading(true);
    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optional: Handle upload progress
      },
      (error) => {
        console.error(error);
        setIsUploading(false);
        alert("Upload failed, please try again.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageUrl(downloadURL);
          setIsUploading(false);
          nextStep(downloadURL);
        });
      }
    );
  };

  return (
    <div>
      <div className="max-w-sm my-24 mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-6">
          <div className="text-center mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4"
            />
            {isUploading ? (
              <div>Uploading...</div>
            ) : (
              <button
                onClick={uploadImage}
                className="bg-primary hover:bg-primary-600 text-white font-bold py-2 px-4 rounded"
              >
                Upload
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsImageUpload;
