export const info = {
  key: 1,
  title: "Blood Glucose Values",
  color: "#8884d8",
  fill: true,
  dataKey: "bg_value",
  data: [
    { timestamp: "00:00", bg_value: 100 },
    { timestamp: "05:00", bg_value: 110 },
    { timestamp: "10:00", bg_value: 120 },
    { timestamp: "15:00", bg_value: 115 },
    { timestamp: "20:00", bg_value: 105 },
    { timestamp: "00:00", bg_value: 70 },
    { timestamp: "05:00", bg_value: 110 },
    { timestamp: "10:00", bg_value: 157 },
    { timestamp: "15:00", bg_value: 161 },
    { timestamp: "20:00", bg_value: 124 },
  ],
  pointBorderColor: "aqua",
  borderColor: "black",
  backGroundColor: "aqua",
};

export const daymeans = {
  key: 2,
  title: "Daily Value Means",
  color: "#8884d8",
  dataKey: "mean",
  data: [
    {
      day: "Sun",
      mean: 60,
    },
    {
      day: "Mon",
      mean: 75,
    },
    {
      day: "Tue",
      mean: 62,
    },
    {
      day: "Wed",
      mean: 78,
    },
    {
      day: "Thu",
      mean: 83,
    },
    {
      day: "Fri",
      mean: 96,
    },
    {
      day: "Sat",
      mean: 102,
    },
  ],
};
