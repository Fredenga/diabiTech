import { FC } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IProps } from "../Glucose/Glucose";
import "./Predictions.scss";

const Predictions: FC<IProps> = ({ data, dataKey, color }) => {
  return (
    <div className="predictions">
      <h1>Blood Glucose Forecast</h1>
      <ResponsiveContainer width="99%" height="85%">
        <LineChart width={300} height={180} data={data}>
          <Tooltip />
          <Legend align="right" />
          <XAxis dataKey="timestamp">
            <Label value="Seconds" offset={0} position="bottom" />
          </XAxis>
          <YAxis dataKey="bg_value">
            <Label
              value="Predicted Values"
              offset={-15}
              angle={-90}
              position="left"
            />
          </YAxis>
          <CartesianGrid strokeDasharray="3 3" strokeWidth={1} stroke="#ccc" />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Predictions;
