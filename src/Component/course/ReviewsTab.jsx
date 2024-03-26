import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import app from "../../database/firebase";

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

const ReviewCard = ({ review }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      console.log("Fetching user data for review:", review?.id);
      const db = getFirestore(app);
      const userRef = doc(db, "User", review?.id);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        console.log("No such document!");
        return;
      }
      const userData = docSnap.data();
      setUser(userData);
      console.log("User data fetched successfully:", userData);

      setUser(userData);
      console.log("User data fetched successfully:", userData[0]);
    };
    fetchUser();
  }, [review?.id]);
  return (
    <div className="flex gap-4 p-4">
      <img
        src={
          review.image ||
          "https://bestwpware.com/html/tf/edumim/assets/images/all-img/cmnt-2.png"
        }
        alt={review?.name || "User"}
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
        <p className="text-gray-600 mt-2">{review?.comment}</p>
        <p className="font-bold text-lg">{user?.fname + " " + user?.lname}</p>
        <p className="text-gray-600 text-md">{review?.timestamp}</p>
      </div>
    </div>
  );
};

const ReviewsTab = () => {
  const param = useParams();
  const courseId = param?.id;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      console.log("Fetching reviews for course:", courseId);
      const db = getFirestore(app);
      const reviewsRef = collection(db, "Course", courseId, "Reviews");

      try {
        const querySnapshot = await getDocs(reviewsRef);

        const reviewsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(reviewsList);
        console.log("Reviews fetched successfully:", reviewsList);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [courseId]);

  return (
    <div className="bg-white p-6">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewsTab;
