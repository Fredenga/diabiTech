import { useContext, useEffect, useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import "./Predictions.scss";
import { DataContext } from "../../context/dataContext";
import axios from "axios";
import moment from "moment";
import { convertStringToArray } from "../Stats/calculations";
import { PredContext } from "../../context/predContext";

type Chart = {
  ID: number;
  bg_value: number;
};

export let lastVal: number = 0;

const Predictions = () => {
  const { data } = useContext(DataContext);
  const glucoseData = data.map((item) => item.glucoseData);
  const sendData = glucoseData.map((item) => {
    const newItem = item;
    newItem.timestamp = moment(item.timestamp).format("YYYY-MM-DDTHH:mm:ss");
    newItem.bg_value = Math.floor(item.bg_value);
    return newItem;
  });
  const [values, setValues] = useState<number[]>([]);
  const [charts, setCharts] = useState<Chart[]>([]);
  const { dispatch } = useContext(PredContext);
  // const lastRecords = sendData.slice(sendData.length - 6);
  useEffect(() => {
    async function predict() {
      try {
        const pred = await axios.post(
          "https://bg-prediction-server.onrender.com/api/v1/predict",
          {
            data: sendData
          }
        );

        const firstKey = Object.keys(pred.data)[0];
        const firstValue: string = pred.data[firstKey];

        const vl = convertStringToArray(firstValue);
        vl.pop();
        setValues(vl);

        let count: number = 0;
        let my: Chart[] = [];
        values.forEach((item) => {
          my.push({ ID: count++, bg_value: item });
        });
        setCharts(my);
        dispatch({ type: "ADD_DATA", payload: charts });
        lastVal = charts[charts.length - 1].bg_value;
      } catch (error) {
        console.log(`error occured: ${error}`);
      }
    }
    predict();
  }, [sendData, values]);

  return (
    <div className="predictions">
      <h1>Blood Glucose Forecasts</h1>
      {charts.length > 0 && (
        <ResponsiveContainer width="99%" height="85%">
          <LineChart width={300} height={180} data={charts}>
            <Tooltip />
            <Legend align="right" />
            <XAxis dataKey="ID" domain={[0, charts.length]}>
              <Label value="Forecast ID" offset={0} position="bottom" />
            </XAxis>
            <YAxis dataKey="bg_value" domain={[50, 150]}>
              <Label
                value="Predicted Values"
                offset={-15}
                angle={-90}
                position="left"
              />
            </YAxis>
            <CartesianGrid
              strokeDasharray="3 3"
              strokeWidth={1}
              stroke="#ccc"
            />
            <Line
              type="monotone"
              dataKey="bg_value"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Predictions;
