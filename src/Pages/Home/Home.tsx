import { useContext, useEffect } from "react";
import Mainbar from "../../components/Mainbar/Mainbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.scss";
import axios from "axios";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { DataContext, GlucoseData } from "../../context/dataContext";

const Home = () => {
  const { dispatch } = useContext(DataContext);
  const fetched: GlucoseData[] = [];

  useEffect(() => {
    async function Attempt() {
      const channelId = process.env.REACT_APP_THINGSPEAK_CHANNEL_ID;
      const apiKey = process.env.REACT_APP_THINGSPEAK_API_KEY;

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
              glucoseData: {
                bg_value: feed.field1,
                timestamp: feed.created_at
              }
            });
            console.log(`Added document with entry_id: ${feed.entry_id}`);
          }
        }
        const { docs } = await getDocs(q);
        // dispatch({ type: "ADD_DATA", payload: docs as any });

        docs.forEach((doc) => {
          const docData = doc.data() as {
            // Cast document data to your expected type
            entry_id: number;
            glucoseData: {
              timestamp: string;
              bg_value: number;
            };
          };

          fetched.push({
            entry_id: docData.entry_id,
            glucoseData: {
              timestamp: docData.glucoseData.timestamp,
              bg_value: docData.glucoseData.bg_value
            }
          });
        });
        const sortedData = fetched.sort((a, b) => a.entry_id - b.entry_id);
        dispatch({ type: "ADD_DATA", payload: sortedData });
      } catch (error) {
        console.log(error);
      }
    }
    Attempt();
    // predict();
  }, []);
  return (
    <div className="home">
      <Sidebar />
      <Mainbar />
    </div>
  );
};

export default Home;
