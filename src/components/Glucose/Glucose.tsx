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
  YAxis,
} from "recharts";
import "./Glucose.scss";

export interface IProps {
  title: string;
  data: Object[];
  color: string;
  key: number;
  dataKey: string;
}

const Glucose: React.FC<IProps> = ({ color, data, dataKey, title }) => {
  const getFill = (value: number): string => {
    const fill: string = value < 80 || value > 180 ? "#FD0909" : "#4FFD09";
    return fill;
  };
  return (
    <div className="glucose">
      <h1>{title}</h1>
      <ResponsiveContainer width="99%" height="75%">
        {/* <LineChart width={300} height={180} data={data}>
          <Tooltip />
          <Legend align="right" />
          <XAxis dataKey="timestamp">
            <Label value="Seconds" offset={0} position="bottom" />
          </XAxis>
          <YAxis dataKey="bg_value">
            <Label
              value="Blood Glucose Values"
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
        </LineChart> */}

        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp">
            <Label value="Seconds" offset={0} position="bottom" />
          </XAxis>
          <YAxis dataKey="bg_value">
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
            dataKey={dataKey}
            stackId="1"
            stroke="#82ca9d"
            fill={getFill(150)}
            fillOpacity={0.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Glucose;
