import { useContext, useEffect } from "react";
import Mainbar from "../../components/Mainbar/Mainbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.scss";
import axios from "axios";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/authContext";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
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
        console.log(existingIds.size);

        // Add missing documents
        for (const feed of feeds) {
          console.log(feed);
          if (!existingIds.has(feed.entry_id)) {
            await addDoc(colRef, {
              date: feed.created_at,
              entry_id: feed.entry_id,
              reading: feed.field1,
            });
            console.log(`Added document with entry_id: ${feed.entry_id}`);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    Attempt();
  }, []);
  return (
    <div className="home">
      <Sidebar />
      <Mainbar />
    </div>
  );
};

export default Home;
