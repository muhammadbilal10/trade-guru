import React from "react";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Daniel Smith",
    date: "Jan 24, 2022",
    rating: 4,
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.",
    image:
      "https://bestwpware.com/html/tf/edumim/assets/images/all-img/cmnt-1.png",
  },
  {
    id: 2,
    name: "Daniel Smith",
    date: "Jan 24, 2022",
    rating: 3,
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.",
    image:
      "https://bestwpware.com/html/tf/edumim/assets/images/all-img/cmnt-2.png",
  },
];

const ReviewCard = ({ review }) => (
  <div className="flex gap-4 p-4">
    <img
      src={review.image}
      alt={review.name}
      className="w-12 h-12 rounded-full"
    />
    <div>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            color={index < review.rating ? "orange" : "gray"}
          />
        ))}
      </div>
      <p className="text-gray-600 mt-2">{review.content}</p>
      <p className="font-bold text-lg">{review.name}</p>
      <p className="text-gray-600 text-md">{review.date}</p>
    </div>
  </div>
);

const ReviewsTab = () => (
  <div className="bg-white p-6">
    <h2 className="text-2xl font-bold mb-4">Reviews</h2>
    {reviews.map((review) => (
      <ReviewCard key={review.id} review={review} />
    ))}
  </div>
);

export default ReviewsTab;
