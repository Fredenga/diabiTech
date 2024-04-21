import {
  Area,
  AreaChart,
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
import "./Glucose.scss";
import { useContext } from "react";
import { DataContext } from "../../context/dataContext";
import moment from "moment";

export interface IProps {
  title: string;
  data: Object[];
  color: string;
  key: number;
  dataKey: string;
}

const Glucose = () => {
  const getFill = (value: number): string => {
    const fill: string = value < 80 || value > 180 ? "#FD0909" : "#4FFD09";
    return fill;
  };
  const { data } = useContext(DataContext);
  const plotted = data.map((item) => ({
    timestamp: moment(item.glucoseData.timestamp).format("MM-DD-HH:mm"),
    bg_value: item.glucoseData.bg_value
  }));
  return (
    <div className="glucose">
      <h1>Blood Glucose Values</h1>
      {data && (
        <ResponsiveContainer width="99%" height="75%">
          <AreaChart data={plotted}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickCount={5}>
              <Label value="Timestamp" offset={0} position="bottom" />
            </XAxis>
            <YAxis dataKey="bg_value" domain={[40, 200]}>
              <Label
                value="Blood Glucose Values"
                offset={-15}
                angle={-90}
                position="left"
              />
            </YAxis>
            <Tooltip />
            <Area
              type="monotone"
              dataKey="bg_value"
              stackId="1"
              stroke="#82ca9d"
              fill={getFill(150)}
              fillOpacity={0.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Glucose;
