import React, { useEffect, useState } from "react";
import FeedbackForm from "./FeedbackForm";
import Topnav from "../../navbar/topnavbar";
import Sidenav from "../../navbar/sidenav";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";

import { v4 as uuid } from "uuid";
import {
  setDoc,
  doc,
  updateDoc,
  getFirestore,
  getDoc,
} from "firebase/firestore";
import app from "../../../../database/firebase";

export default function Feedback() {
  const cookies = new Cookies();
  const param = useParams();
  const navigate = useNavigate();
  const courseId = param.id;
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(app);
        const docRef = doc(db, "Feedback", courseId);
        const feedBackSnap = await getDoc(docRef);
        if (feedBackSnap.exists()) {
          const data = feedBackSnap.data();
          console.log(data);
          setFeedbackList(data.feedBackQuestion);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const feedbackId = uuid();
      const instructorId = cookies.get("userId");
      const db = getFirestore(app);
      const courseDocRef = doc(db, "Feedback", courseId);

      const feedBackData = {
        feedbackId: feedbackId,
        feedBackQuestion: feedbackList,
        instructorId: instructorId,
        courseId: courseId,
        feedBackresponse: [],
      };

      await setDoc(courseDocRef, feedBackData);
      navigate(`/coursePage`);
    } catch (error) {
      console.error("Error adding feedback:", error.message);
    }
  };
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <Sidenav />
      <div className="flex flex-col flex-1 w-full">
        <Topnav />
        <main className="h-full flex flex-col justify-between gap-2 my-10  overflow-y-auto px-5 max-w-7xl mx-12">
          <div className="mt-8 flex flex-col space-y-3">
            <FeedbackForm
              feedbackList={feedbackList}
              setFeedbackList={setFeedbackList}
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => {
                window.history.back();
              }}
              className=" bg-primary w-24 hover:bg-primary-600 text-white p-3 rounded-md focus:outline-none focus:shadow-outline-blue "
            >
              Prev
            </button>
            <button
              onClick={handleSave}
              className=" bg-primary w-24 hover:bg-primary-600 text-white p-3 rounded-md focus:outline-none focus:shadow-outline-blue "
            >
              Save
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
