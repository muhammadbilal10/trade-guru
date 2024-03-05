

import React, { useState } from 'react';

import { Link } from "react-router-dom";

import Topnav from '../navbar/topnavbar';
import Sidenav from '../navbar/sidenav';
import Card from '../card';

const AdvertisementCard = ({ title, description, imageUrl, rating }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {imageUrl && (
            <img src={imageUrl} alt={title} className="w-full h-40 object-cover object-center" />
        )}
        <div className="p-4">
            <h3 className="text-xl font-bold mb-2 text-purple-800">{title}</h3>
            <p className="text-gray-700">{description}</p>
            {rating && (
                <div className="flex items-center mt-4">
                    <span className="text-gray-600 mr-2">Rating:</span>
                    <div className="flex">
                        {[...Array(rating)].map((_, index) => (
                            <svg key={index} className="w-6 h-6 text-yellow-500 fill-current" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M19.363 7.727a1.136 1.136 0 0 0-1.032-.705l-6.214-.708L10.25.896a1.119 1.119 0 0 0-2.094 0l-1.866 5.418-6.214.708a1.136 1.136 0 0 0-.63 1.943l5.01 3.647-1.82 5.812a1.128 1.128 0 0 0 .436 1.196c.33.24.76.293 1.134.138L10 16.45l4.973 3.076c.38.235.853.188 1.186-.1a1.128 1.128 0 0 0 .437-1.196l-1.819-5.812 5.01-3.647c.363-.265.478-.766.234-1.143zm-6.613 3.197c.13.095.299.145.468.145.167 0 .335-.05.468-.145l1.878-1.368.79 2.527c.098.313-.015.651-.275.832-.117.085-.258.128-.399.128a.95.95 0 0 1-.468-.125l-1.856-1.148-1.855 1.148c-.13.08-.279.125-.43.125-.145 0-.284-.043-.402-.128a.98.98 0 0 1-.276-.832l.79-2.527 1.878 1.368z"
                                />
                            </svg>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
);

const Advertisements = () => {
    const [advertisements, setAdvertisements] = useState([
        {
            title: "Learn React",
            description: "Master React with our comprehensive online courses!",
            imageUrl: "https://via.placeholder.com/300x200",
            rating: 4,
        },
        {
            title: "JavaScript Bootcamp",
            description: "Become a JavaScript ninja in just 30 days!",
            imageUrl: "https://via.placeholder.com/300x200",
            rating: 5,
        },
        {
            title: "Python for Beginners",
            description: "Start your journey into Python programming!",
            imageUrl: "https://via.placeholder.com/300x200",
            rating: 3,
        },
    ]);
    const [selectedAdvertisement, setSelectedAdvertisement] = useState(null);
    const [advertisementForm, setAdvertisementForm] = useState({
        title: '',
        description: '',
        imageUrl: '',
        rating: 0,
    });

    const handleAdvertisementSelection = (advertisement) => {
        setSelectedAdvertisement(advertisement);
        setAdvertisementForm({
            title: advertisement.title,
            description: advertisement.description,
            imageUrl: advertisement.imageUrl,
            rating: advertisement.rating,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdvertisementForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleAdvertisementSubmission = () => {
        // Dummy submission logic, add new advertisement to the list
        setAdvertisements([...advertisements, advertisementForm]);
    };

    const handleAdvertisementUpdate = () => {
        // Dummy update logic, update advertisement in the list
        const updatedAdvertisements = advertisements.map(advertisement =>
            advertisement.title === selectedAdvertisement.title ? advertisementForm : advertisement
        );
        setAdvertisements(updatedAdvertisements);
    };

    const handleAdvertisementRemoval = () => {
        // Dummy removal logic, remove advertisement from the list
        const filteredAdvertisements = advertisements.filter(advertisement =>
            advertisement.title !== selectedAdvertisement.title
        );
        setAdvertisements(filteredAdvertisements);
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold mb-8 text-purple-800 text-center">Manage Advertisements</h1>

            {/* Advertisements List */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-purple-700">Advertisements</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {advertisements.map((advertisement, index) => (
                        <div key={index} onClick={() => handleAdvertisementSelection(advertisement)}>
                            <AdvertisementCard {...advertisement} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Add New Advertisement Form */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-purple-700">Add New Advertisement</h2>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <form onSubmit={handleAdvertisementSubmission} className="space-y-4">
                        <input
                            type="text"
                            name="title"
                            value={advertisementForm.title}
                            onChange={handleInputChange}
                            placeholder="Title"
                            className="w-full border rounded p-2"
                        />
                        <input
                            type="text"
                            name="description"
                            value={advertisementForm.description}
                            onChange={handleInputChange}
                            placeholder="Description"
                            className="w-full border rounded p-2"
                        />
                        <input
                            type="text"
                            name="imageUrl"
                            value={advertisementForm.imageUrl}
                            onChange={handleInputChange}
                            placeholder="Image URL"
                            className="w-full border rounded p-2"
                        />
                        <input
                            type="number"
                            name="rating"
                            value={advertisementForm.rating}
                            onChange={handleInputChange}
                            placeholder="Rating"
                            className="w-full border rounded p-2"
                        />
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Submit
                        </button>
                    </form>
                </div>
            </section>

            {/* Update Advertisement Form */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-purple-700">Update Advertisement</h2>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <form onSubmit={handleAdvertisementUpdate} className="space-y-4">
                        <input
                            type="text"
                            name="title"
                            value={advertisementForm.title}
                            onChange={handleInputChange}
                            placeholder="Title"
                            className="w-full border rounded p-2"
                        />
                        <input
                            type="text"
                            name="description"
                            value={advertisementForm.description}
                            onChange={handleInputChange}
                            placeholder="Description"
                            className="w-full border rounded p-2"
                        />
                        <input
                            type="text"
                            name="imageUrl"
                            value={advertisementForm.imageUrl}
                            onChange={handleInputChange}
                            placeholder="Image URL"
                            className="w-full border rounded p-2"
                        />
                        <input
                            type="number"
                            name="rating"
                            value={advertisementForm.rating}
                            onChange={handleInputChange}
                            placeholder="Rating"
                            className="w-full border rounded p-2"
                        />
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Update
                        </button>
                    </form>
                </div>
            </section>

            {/* Remove Advertisement Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-purple-700">Remove Advertisement</h2>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <button onClick={handleAdvertisementRemoval} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Remove
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Advertisements;

