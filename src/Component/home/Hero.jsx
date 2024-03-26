// import React from "react";

// const Hero = () => {
//   const imageURL =
//     "https://bestwpware.com/html/tf/edumim/assets/images/all-img/bred.png";
//   return (
//     <div className="mt-10 mb-24 relative">
//       <img src={imageURL} alt="hero" className="w-full h-96 object-cover" />
//       <h2 className="absolute left-[40%]  sm:left-[46%] top-1/2 text-4xl font-bold"></h2>
//     </div>
//   );
// };

// export default Hero;

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

export default function Hero() {
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

  const [uid, setUid] = useState("r6SQliH0isTz7qhgS1lggXERJ9E3");
  cookies.set("userId", uid);
  cookies.set("islogin", false);
  console.log(cookies.get("userId"));
  console.log(cookies.get("islogin"));
  const [displayAds, setDisplayAds] = useState([]);

  useEffect(() => {
    const db = getFirestore(app);
    const getUser = async () => {
      const documentId = cookies.get("userId");
      const collectionName = "Instructor";
      const docRef = doc(db, collectionName, documentId);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    };

    const displayAdsWithBuyers = async () => {
      const db = getFirestore(app);
      const plansRef = collection(db, "AdvertisementPlans");
      const q = query(
        plansRef,
        where("type", "==", "Display ad"),
        where("placement", "==", "Course page")
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
      <HomeHero images={displayAds} />
    </div>
  );
}
