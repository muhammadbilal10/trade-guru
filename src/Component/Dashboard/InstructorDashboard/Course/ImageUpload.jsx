import React, { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export default function ImageUpload({
  nextStep,
  prevStep,
  formData,
  image,
  setImage,
}) {
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  useEffect(() => {
    if (!image || formData.imageUrl) {
      if (formData.imageUrl) {
        console.log("Image URL: ", formData.imageUrl);
        setPreviewUrl(formData.imageUrl);
      } else {
        setPreviewUrl("");
      }
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(image);
  }, [image]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setUploaded(false); // Reset uploaded state
    }
  };

  const uploadImage = async () => {
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    setIsUploading(true);
    const storage = getStorage();
    const storageReference = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageReference, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.error(error);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          formData.imageUrl = downloadURL;

          setIsUploading(false);
          setUploaded(true);
        });
      }
    );
  };

  const removeImage = async () => {
    if (!formData.imageUrl) {
      if (!uploaded || !image) {
        setImage(null);
        setPreviewUrl("");
        return;
      }
    }
    const storage = getStorage();
    const urlPath = new URL(formData.imageUrl).pathname;
    const filePath = decodeURIComponent(urlPath.split("/o/")[1].split("?")[0]);
    console.log("File Path: ", filePath);
    const storageReference = ref(storage, filePath);

    deleteObject(storageReference)
      .then(() => {
        setImage(null);
        setPreviewUrl("");
        setUploaded(false);
        formData.imageUrl = "";
      })
      .catch((error) => {
        console.error("Error removing image: ", error);
      });
  };

  return (
    <div>
      <div className="max-w-sm my-24 mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-6">
          <div
            id="image-preview"
            className="max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer"
          >
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mb-4 max-h-40 mx-auto"
              />
            )}
            <input
              id="upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label htmlFor="upload" className="cursor-pointer">
              {!previewUrl && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 text-gray-700 mx-auto mb-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <p className="font-normal text-sm text-gray-400 md:px-6">
                    Choose photo size should be less than{" "}
                    <b className="text-gray-600">2mb</b>
                  </p>
                  <p className="font-normal text-sm text-gray-400 md:px-6">
                    and should be in{" "}
                    <b className="text-gray-600">JPG, PNG, or GIF</b> format.
                  </p>
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
                    Upload picture
                  </h5>
                </>
              )}

              {isUploading && (
                <div className="text-center mb-3">
                  Uploading... {Math.round(uploadProgress)}%
                </div>
              )}
            </label>
            {image && (
              <button
                onClick={removeImage}
                className="mt-4 px-4 py-2 bg-secondary text-white rounded"
              >
                Remove Image
              </button>
            )}
          </div>
          {!uploaded && image && (
            <div
              onClick={uploadImage}
              className="flex items-center justify-center"
            >
              <div className="w-full">
                <label className="w-full text-white bg-primary hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer">
                  <span className="text-center ml-2">
                    {isUploading ? "Uploading..." : "Upload"}
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 flex justify-between">
        <button
          onClick={prevStep}
          className="bg-primary w-24 hover:bg-primary-600 text-white p-3 rounded-md focus:outline-none focus:shadow-outline-blue"
        >
          Prev
        </button>
        <button
          onClick={nextStep}
          className="bg-primary w-24 hover:bg-primary-600 text-white p-3 rounded-md focus:outline-none focus:shadow-outline-blue"
        >
          Next
        </button>
      </div>
    </div>
  );
}
