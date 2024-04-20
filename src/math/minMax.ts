import { GlucoseData } from "../context/dataContext";

export function calculateMinMaxPerDay(
  data: GlucoseData[]
): { date: string; min: number; max: number }[] {
  // Create an object to store daily data
  const dailyData: Record<
    string,
    { min: number | undefined; max: number | undefined }
  > = {};

  for (const item of data) {
    const timestamp = item.glucoseData.timestamp;
    const yearMonthDate = timestamp.slice(0, 10); // Extract year-month-date part

    // Check if entry exists for this year-month-date
    if (!dailyData[yearMonthDate]) {
      dailyData[yearMonthDate] = { min: undefined, max: undefined };
    }

    const bgValue = item.glucoseData.bg_value;

    // Initialize min and max if first entry for the day
    if (dailyData[yearMonthDate].min === undefined) {
      dailyData[yearMonthDate].min = bgValue;
    }
    if (dailyData[yearMonthDate].max === undefined) {
      dailyData[yearMonthDate].max = bgValue;
    }

    // Update min and max if necessary
    dailyData[yearMonthDate].min = Math.min(
      dailyData[yearMonthDate].min!,
      bgValue
    ); // Use type assertion for min!
    dailyData[yearMonthDate].max = Math.max(
      dailyData[yearMonthDate].max!,
      bgValue
    ); // Use type assertion for max!
  }

  // Create results array
  const results: { date: string; min: number; max: number }[] = [];
  for (const key in dailyData) {
    const { min, max } = dailyData[key];

    // Handle cases with no data for a day (min and max undefined)
    if (min === undefined || max === undefined) {
      results.push({ date: key, min: 0, max: 0 });
      continue;
    }

    results.push({ date: key, min: min, max: max });
  }

  return results;
}
