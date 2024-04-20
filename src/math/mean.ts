import { GlucoseData } from "../context/dataContext";

export function calculateMeanValues(
  data: GlucoseData[]
): Record<string, { count: number; sum: number; mean: number }> {
  // Create an object to store the mean values for each timestamp
  const meanValues: Record<
    string,
    { count: number; sum: number; mean: number }
  > = {};

  for (const item of data) {
    const timestamp = item.glucoseData.timestamp;
    const yearMonthDate = timestamp.slice(0, 10); // Extract year-month-date part

    // Check if entry exists for this year-month-date
    if (!meanValues[yearMonthDate]) {
      meanValues[yearMonthDate] = { count: 0, sum: 0, mean: 0 };
    }

    meanValues[yearMonthDate].count++;
    meanValues[yearMonthDate].sum += item.glucoseData.bg_value;
  }

  // Calculate the final mean for each timestamp
  for (const key in meanValues) {
    meanValues[key].mean = meanValues[key].sum / meanValues[key].count;
  }

  return meanValues;
}

export function DayMeanValues(
  data: GlucoseData[]
): { date: string; mean_value: number }[] {
  // Create an object to store intermediate calculations
  const meanValueByTimestamp: Record<string, { count: number; sum: number }> =
    {};

  for (const item of data) {
    const timestamp = item.glucoseData.timestamp;
    const yearMonthDate = timestamp.slice(0, 10); // Extract year-month-date part

    // Check if entry exists for this year-month-date
    if (!meanValueByTimestamp[yearMonthDate]) {
      meanValueByTimestamp[yearMonthDate] = { count: 0, sum: 0 };
    }

    meanValueByTimestamp[yearMonthDate].count++;
    meanValueByTimestamp[yearMonthDate].sum += item.glucoseData.bg_value;
  }

  // Calculate final means and construct the result array
  const results: { date: string; mean_value: number }[] = [];
  for (const key in meanValueByTimestamp) {
    const meanValue =
      meanValueByTimestamp[key].sum / meanValueByTimestamp[key].count;
    results.push({ date: key, mean_value: Math.round(meanValue) });
  }

  return results;
}
