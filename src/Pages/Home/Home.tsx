import { useContext, useEffect, useState } from "react";
import Mainbar from "../../components/Mainbar/Mainbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.scss";
import axios from "axios";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/authContext";

const Home = () => {
  const [arr, setArr] = useState({});
  async function predict() {
    try {
      const pred = await axios.post(
        "https://bg-prediction-server.onrender.com/api/v1/predict",
        {
          data: [
            { timestamp: "2024-03-30T12:00:00", bg_value: 98 },
            { timestamp: "2024-03-30T12:05:00", bg_value: 102 },
            { timestamp: "2024-03-30T12:10:00", bg_value: 105 },
            { timestamp: "2024-03-30T12:15:00", bg_value: 100 },
            { timestamp: "2024-03-30T12:20:00", bg_value: 99 },
            { timestamp: "2024-03-30T12:00:00", bg_value: 104 },
            { timestamp: "2024-03-30T12:05:00", bg_value: 110 },
            { timestamp: "2024-03-30T12:10:00", bg_value: 113 },
            { timestamp: "2024-03-30T12:15:00", bg_value: 119 },
            { timestamp: "2024-03-30T12:20:00", bg_value: 126 }
          ]
        }
      );
      console.log(pred.data);
    } catch (error) {
      console.log(`error occured: ${error}`);
    }
  }
  useEffect(() => {
    async function Attempt() {
      const channelId = "2497506";
      const apiKey = "4CLGJVET3T65I7UG";

      const apiUrl = `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}`;
      const colRef = collection(db, "glucoseData");
      const q = query(colRef);

      try {
        const { data } = await axios.get(apiUrl);
        const feeds: any[] = data.feeds;
        const existingIds = new Set();

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => existingIds.add(doc.data().entry_id));
        // Add missing documents
        for (const feed of feeds) {
          if (!existingIds.has(feed.entry_id)) {
            await addDoc(colRef, {
              entry_id: feed.entry_id,
              bg_value: feed.field1,
              timestamp: feed.created_at
            });
            console.log(`Added document with entry_id: ${feed.entry_id}`);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    Attempt();
    predict();
  }, [predict]);
  return (
    <div className="home">
      <Sidebar />
      <Mainbar />
    </div>
  );
};

export default Home;
