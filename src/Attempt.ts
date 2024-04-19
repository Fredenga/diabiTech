import axios from "axios";

export default async function Attempt() {
  const channelId = "2497506";
  const apiKey = "4CLGJVET3T65I7UG";

  // Construct the API URL
  const apiUrl = `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}`;

  console.log("Starting to fetch data...");
  try {
    const response = await axios.get(apiUrl);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
