import { GlucoseData } from "../context/dataContext";

export async function calculateDailySummary(data: GlucoseData[]): Promise<
  {
    date: string;
    min: number;
    max: number;
    mean: number;
    std_dev: number;
    normalCount: number;
  }[]
> {
  // Daily summary object to store calculated values (using a Map for efficient lookups)
  const dailySummary = new Map<
    string,
    { min: number; max: number; sum: number; count: number }
  >();

  // Function to calculate min, max, sum, and count for a day's data
  function updateDailyStats(date: string, bgValue: number) {
    const existingStats = dailySummary.get(date);

    if (existingStats) {
      existingStats.min = Math.min(existingStats.min, bgValue);
      existingStats.max = Math.max(existingStats.max, bgValue);
      existingStats.sum += bgValue;
      existingStats.count++;
    } else {
      dailySummary.set(date, {
        min: bgValue,
        max: bgValue,
        sum: bgValue,
        count: 1
      });
    }
  }

  // Calculate summary for each data point
  for (const item of data) {
    const timestamp = item.glucoseData.timestamp;
    const yearMonthDate = timestamp.slice(0, 10); // Extract year-month-date part

    updateDailyStats(yearMonthDate, item.glucoseData.bg_value);
  }

  // Convert Map entries to an array of objects with calculated statistics
  const dailySummaryArray: {
    date: string;
    min: number;
    max: number;
    mean: number;
    std_dev: number;
    normalCount: number;
  }[] = [];
  for (const [date, stats] of dailySummary.entries()) {
    const mean = Math.round(stats.count > 0 ? stats.sum / stats.count : 0); // Handle cases with no data
    const stdDev = calculateStdDev(stats.sum, stats.count); // Implement stdDev calculation (not shown)

    dailySummaryArray.push({
      date: date,
      min: stats.min,
      max: stats.max,
      mean,
      std_dev: stdDev,
      normalCount: 0 // Placeholder for normal value calculation (not shown in this example)
    });
  }

  return dailySummaryArray;
}

function calculateStdDev(sum: number, count: number): number {
  if (count <= 1) {
    return 0; // Handle case with no data or single data point
  }

  const variance = (sum * sum) / count - (sum / count) * (sum / count);
  return Math.round(Math.sqrt(variance));
}
