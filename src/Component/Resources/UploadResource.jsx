// UploadResource.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from "../navbar/navbar";
const UploadResource = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      // Make an API request to your backend for handling the file upload
      const response = await axios.post('YOUR_BACKEND_UPLOAD_ENDPOINT', formData);

      // Handle the response as needed (e.g., show a success message)
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
      <Navbar/>
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Upload a Resource</h2>
      <div className="mb-4">
        <label htmlFor="file" className="block text-sm font-medium text-gray-600">
          Choose a file
        </label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleFileChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Upload
      </button>
    </div>
    </>
  );
};

export default UploadResource;
