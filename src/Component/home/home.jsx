import React, { useEffect } from "react";
import Navbar from "../navbar/navbar";
import Cookies from "universal-cookie";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import app from "../../database/firebase";
import { useState } from "react";
import HomeHero from "./HomeHero";
import Footer from "../footer/Footer";

export default function Home() {
  const cookies = new Cookies();
  //User collection
  // {
  //     email: "zubair@gmial.com"(string)
  //     fname: "zubair"(string)
  //     gender: "female"(string)
  //     isInstructor: false(Boolean)
  //     lname: "haseeb"(string)
  //     occupasion: null
  //     profilePicture: null

  // const [uid, setUid] = useState("r6SQliH0isTz7qhgS1lggXERJ9E3");
  // cookies.set("userId", uid);
  // cookies.set("islogin", false);
  // console.log(cookies.get("userId"));
  // cookies.set('isAdmin', false);
  // cookies.set('isInstructor', isExist[0]);
  // cookies.set('isapprove', isExist[1]);

 /////for testing
  console.log("user id->", cookies.get("userId"));
  console.log("is login->", cookies.get("islogin"));
  console.log("isAdmin->", cookies.get("isAdmin"));
  console.log("isInstructor->", cookies.get("isInstructor"));
  console.log("isapprove->", cookies.get("isapprove"));
  const [displayAds, setDisplayAds] = useState([]);

  useEffect(() => {
    // const db = getFirestore(app);
    // const getUser = async () => {
    //   const documentId = cookies.get("userId");
    //   const collectionName = "Instructor";
    //   const docRef = doc(db, collectionName, documentId);
    //   getDoc(docRef)
    //     .then((docSnap) => {
    //       if (docSnap.exists()) {
    //         console.log("Document data:", docSnap.data());
    //       } else {
    //         console.log("No such document!");
    //       }
    //     })
    //     .catch((error) => {
    //       console.log("Error getting document:", error);
    //     });
    // };

    const displayAdsWithBuyers = async () => {
      const db = getFirestore(app);
      const plansRef = collection(db, "AdvertisementPlans");
      //////this is for home page
      const q = query(
        plansRef,
        where("type", "==", "Display ad"),
        where("placement", "==", "Home Page")
      );
      console.log("Display ads with buyers:");
      try {
        const querySnapshot = await getDocs(q);
        for (const doc of querySnapshot.docs) {
          // Use a for...of loop for async operations inside
          console.log(doc.id, " => ", doc.data());
          const buyersRef = collection(doc.ref, "AdsBuyers");
          const buyersSnapshot = await getDocs(buyersRef);
          const buyersData = [];
          buyersSnapshot.forEach((buyerDoc) => {
            // Store buyer information in an array
            buyersData.push(buyerDoc.data());
            console.log(buyerDoc.data());
            setDisplayAds((prev) => [...prev, buyerDoc.data()?.adImage]);
          });

          console.log("Buyers for ad:", doc.id, " => ", buyersData);
        }
      } catch (error) {
        console.error("Error retrieving or updating documents:", error);
      }
    };

    displayAdsWithBuyers();
  }, []);

  const backgroundImages = [
    "https://www.stockpathshala.com/wp-content/uploads/2021/02/Fundamental.jpg",
    "https://ultra-realhomes.b-cdn.net/wp-content/uploads/2022/06/spacejoy-scaled.jpg",
    "https://ultra-realhomes.b-cdn.net/wp-content/uploads/2022/06/office-working-space-scaled.jpg",
  ];

  return (
    <div className="">
      <Navbar />
      <HomeHero images={displayAds} />
      <Footer />
      {/* <div className="container mx-auto py-10 px-4 animate-fade-in-up">
        <h1 className="text-5xl font-bold text-center mb-12 animate-pulse">
          Explore the World of tading
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="transform hover:scale-105 transition duration-500 ease-in-out p-6 bg-purple-500 rounded-lg shadow-xl">
            <h2 className="font-bold text-3xl mb-3">Learn trading Basics</h2>
            <p>Understand the fundamentals of technical analysis.</p>
          </div>

          <div className="transform hover:scale-105 transition duration-500 ease-in-out p-6 bg-purple-500 rounded-lg shadow-xl">
            <h2 className="font-bold text-3xl mb-3">
              Advanced Trading Strategies
            </h2>
            <p>
              Explore advanced concepts and trading strategies for forex
              markets.
            </p>
          </div>

          <div className="transform hover:scale-105 transition duration-500 ease-in-out p-6 bg-purple-500 rounded-lg shadow-xl">
            <h2 className="font-bold text-3xl mb-3">Market Analysis</h2>
            <p>Analyze markets for informed investment decisions.</p>
          </div>

          <div className="transform hover:scale-105 transition duration-500 ease-in-out p-6 bg-purple-500 rounded-lg shadow-xl">
            <h2 className="font-bold text-3xl mb-3">Community Forum</h2>
            <p>
              Join our forum to discuss and share insights with trading
              enthusiasts.
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
