import { collection,arrayUnion, doc, getFirestore, setDoc,addDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import app from "../../database/firebase";
import AdsImageUpload from "../Dashboard/advertisement/AdsImageUpload";
import { v4 as uuid } from "uuid";
import Cookies from 'universal-cookie';

const PaymentConfirmationPage = () => {
  const cookies = new Cookies();
  const [userId, setUserId] = useState(cookies.get('userId'));
  const navigate = useNavigate();
  const params = useParams();
  const [adImageUrl, setAdImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const adType = queryParams.get("adType");
  ///transaction table
  const title = queryParams.get("title");
  const price = queryParams.get("price");

  useEffect(() => {

    const addTransaction = async (type, title, price, id,method) => {
      const db = getFirestore(app);
      const currentDate = new Date();

      try {
        const docRef = await addDoc(collection(db, 'transactions'), {
          type: type,
          price: Number(price),
          title: title,
          userId: id,
          date: currentDate.toISOString().split('T')[0], // Only date without time
          gateway:method,
        });
        console.log('Transaction document added with ID:', docRef.id);
      } catch (error) {
        console.error('Error adding transaction:', error.message);
      }
    };


    const SetEnrolled = async () => {
      const db = getFirestore(app);
      console.log("setting enrolled");
      const docRef = doc(db, "User", userId);
      try {
        console.log(userId)
        const temp = await setDoc(
          docRef,
          {
            enrolledCourses: arrayUnion({
              courseId: params.id,
              myList: false,
              archieved: false,
            }),
          },
          { merge: true }
        );
        console.log(temp);
        addTransaction(type, title, price, userId,"Stripe");
        console.log("Document successfully written!");

      } catch (error) {
        console.error("Error setting document:", error);
      }
    };

    const setAds = async () => {
      const AdId = uuid();
      const db = getFirestore(app);
      const userId = cookies.get('userId');
      const docRef = doc(
        db,
        "AdvertisementPlans",
        params.id,
        "AdsBuyers",
        userId
      );
      try {
        const adData = {
          adId: AdId,
          userId: cookies.get('userId'),
          adImage: "",
        };
        await setDoc(docRef, adData);
        addTransaction(type, title, price, userId,"Stripe");
      } catch (error) {
        console.error("Error setting document:", error);
      }
    };
    if (type === "Ad" && adType !== "Display ad") {
      setAds();
    }
    if (type === "course") {
      SetEnrolled();
    }
  }, []);

  const setAds = async (imageUrl) => {
    const AdId = uuid();
    const db = getFirestore(app);
    const userId = cookies.get('userId');
    const docRef = doc(
      db,
      "AdvertisementPlans",
      params.id,
      "AdsBuyers",
      userId
    );
    try {
      const adData = {
        adId: AdId,
        userId: userId,
        adImage: imageUrl,
      };
      await setDoc(docRef, adData);
      addTransaction(type, title, price, userId,"Stripe");
    } catch (error) {
      console.error("Error setting document:", error);
    }
  };

  const navigateToCourses = () => {
    if (type === "Ad") {
      navigate("/");
    } else {
      navigate("/my-courses");
    }
  };

  const navigateToHome = (imageUrl) => {
    console.log(imageUrl);
    setAds(imageUrl);
    navigate("/");
  };

  if (type === "Ad" && adType === "Display ad" && !loading) {
    return (
      <AdsImageUpload nextStep={navigateToHome} setImageUrl={setAdImageUrl} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <FaCheckCircle className="h-20 w-20 text-secondary" />
          <h1 className="text-2xl font-semibold text-gray-800 mt-4">
            Payment Successful!
          </h1>
          <p className="text-md text-gray-600 text-center mt-2">
            Your enrollment has been confirmed. You can now access your{" "}
            {type === "Ad" ? "Ads" : "Courses"}. materials.
          </p>
          <button
            onClick={navigateToCourses}
            className="mt-6 px-6 py-3 bg-primary text-white rounded-md shadow hover:bg-primary-600 transition duration-200 ease-in-out"
          >
            Go to My {type === "Ad" ? "Ads" : "Courses"}
          </button>
          <button
            onClick={() => navigate("/")}
            className="mt-2 px-6 py-3 bg-gray-300 text-gray-700 rounded-md shadow hover:bg-gray-400 transition duration-200 ease-in-out"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;
