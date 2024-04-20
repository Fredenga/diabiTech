import { GlucoseData } from "../context/dataContext";

export function calculateStdDevPerDay(
  data: GlucoseData[]
): { date: string; std_dev: number }[] {
  // Create an object to store daily data and calculations
  const dailyData: Record<
    string,
    { sum: number; sumSq: number; count: number }
  > = {};

  for (const item of data) {
    const timestamp = item.glucoseData.timestamp;
    const yearMonthDate = timestamp.slice(0, 10); // Extract year-month-date part

    // Check if entry exists for this year-month-date
    if (!dailyData[yearMonthDate]) {
      dailyData[yearMonthDate] = { sum: 0, sumSq: 0, count: 0 };
    }

    const bgValue = item.glucoseData.bg_value;
    dailyData[yearMonthDate].sum += bgValue;
    dailyData[yearMonthDate].sumSq += bgValue * bgValue; // Square the bgValue
    dailyData[yearMonthDate].count++;
  }

  // Calculate standard deviation for each date
  const results: { date: string; std_dev: number }[] = [];
  for (const key in dailyData) {
    const { sum, sumSq, count } = dailyData[key];
    const mean = sum / count; // Calculate mean

    // Handle cases with less than 2 data points (standard deviation undefined)
    if (count < 2) {
      results.push({ date: key, std_dev: 0 });
      continue;
    }

    const variance = (sumSq - count * mean * mean) / (count - 1); // Calculate variance
    const stdDev = Math.sqrt(variance); // Calculate standard deviation

    results.push({ date: key, std_dev: Math.round(stdDev * 100) / 100 });
  }

  return results;
}
