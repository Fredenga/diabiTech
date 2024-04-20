import moment from "moment";
import { GlucoseData } from "../../context/dataContext";

export function calculateMeanBgValueForMostRecent(data: any) {
  let mostRecentDate = null; // Initialize a variable to track the most recent date

  for (const item of data) {
    const timestamp = item.glucoseData.timestamp;
    const dateStr = moment(timestamp).format("YYYY-MM-DD");

    // Update mostRecentDate if current date is newer
    if (!mostRecentDate || moment(dateStr).isAfter(mostRecentDate)) {
      mostRecentDate = dateStr;
    }
  }

  // Process data for the most recent date (if found)
  if (mostRecentDate) {
    const results: any = {};
    for (const item of data) {
      const timestamp = item.glucoseData.timestamp;
      const dateStr = moment(timestamp).format("YYYY-MM-DD");

      if (dateStr === mostRecentDate) {
        if (!results[dateStr]) {
          results[dateStr] = {
            date: dateStr,
            values: []
          };
        }

        results[dateStr].values.push(item.glucoseData.bg_value);
      }
    }

    const todaysData = results[mostRecentDate];
    const meanBgValue =
      todaysData.values.reduce((sum: number, value: number) => sum + value, 0) /
      todaysData.values.length;
    return {
      date: mostRecentDate,
      meanBgValue
    };
  } else {
    // No data found - handle as needed
    return { message: "No data found in the provided entries" }; // Example handling
  }
}

export function convertStringToArray(str: string) {
  const regex = /\[([^\]]+)]/; // Matches numbers within square brackets

  const match = str.match(regex);
  if (!match) {
    throw new Error(
      "Invalid string format. Expected: '[number1, number2, ...]'."
    ); // Throw error for invalid format
  }

  const numbersString = match[1];
  const numbersArray = numbersString.split(/\s+/).map(parseFloat);

  return numbersArray;
}
