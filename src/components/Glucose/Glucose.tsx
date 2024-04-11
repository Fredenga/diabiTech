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
import "./Glucose.scss";

interface Props {
  title: string;
  data: Object[];
  color: string;
  key: number;
  dataKey: string;
}

const Glucose: React.FC<Props> = ({ color, data, dataKey }) => {
  return (
    <div className="glucose">
      {/* <h1>{title}</h1> */}
      <ResponsiveContainer width="99%" height="90%">
        <LineChart width={300} height={180} data={data}>
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
          <CartesianGrid stroke="#f5f5f5" />
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

export default Glucose;
