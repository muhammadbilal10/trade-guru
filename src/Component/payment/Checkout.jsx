import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import app from "../../database/firebase";
import { useLocation, useParams } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51Nxd2nSGfSglhWZnLhWDpprmyfCoyjXAtmQChoSa1QpCjtsUU17k468gNCyQ3OpeJG57cltQ9ZAIoietHhuODX1f00OJyeUiGm"
);

const backendUrl = `https://uctqy6nhdk.us.aircode.run/payment`;

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [course, setCourse] = useState({});
  const [ads, setAds] = useState({});
  const params = useParams();
  const id = params.id;
  console.log(id);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  console.log(type);

  useEffect(() => {
    const fetchPaymentIntent = async (course) => {
      // const price = 800;
      console.log(course?.price);
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currency: "inr",
          amount: course?.price,
          description: course?.title,
        }),
      });

      const { client_secret: clientSecret } = await res.json();

      setClientSecret(clientSecret);
    };

    const getCourse = async () => {
      const db = getFirestore(app);
      const docRef = doc(db, "Course", id);
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());

          setCourse(docSnap.data());
          fetchPaymentIntent(docSnap.data()?.formData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    const getAdvertisement = async () => {
      const db = getFirestore(app);
      const docRef = doc(db, "AdvertisementPlans", id);
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());

          setAds(docSnap.data());

          fetchPaymentIntent({
            price: docSnap.data().price,
            title: docSnap.data().description,
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    if (id && type === "Ad") {
      console.log("Ad");
      getAdvertisement();
    } else {
      getCourse();
    }
  }, []);

  if (!clientSecret) {
    return (
      <form className="">
        <div>
          <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
            <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
          </div>
          <div className="grid gap-10 sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
            <div className="animate-pulse px-4 pt-8">
              <p className="text-xl font-medium">Order Summary</p>
              <div className="mt-8 space-y-3 rounded-lg border bg-white p-6">
                <div className="flex rounded-md bg-gray-300 h-28"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                </div>
              </div>
            </div>
            <div className="animate-pulse mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
              <p className="text-xl font-medium">Payment Details</p>
              <div className="mt-4 mb-4 h-6 bg-gray-300 rounded"></div>
              <div className="mt-6 border-t border-b py-4">
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="mt-6 h-6 bg-gray-300 rounded"></div>
              <div className="mt-4 h-12 bg-blue-300 rounded-md"></div>
            </div>
          </div>
        </div>
      </form>
    );
  }

  const options = {
    clientSecret: clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm courseDetails={course} ads={ads} />
    </Elements>
  );
}
