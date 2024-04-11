import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./Daydata.scss";

interface Props {
  title: string;
  data: Object[];
  color: string;
  key: number;
  dataKey: string;
}

const Daydata: React.FC<Props> = ({ data, dataKey, title }) => {
  return (
    <div className="daydata">
      <span>{title}</span>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <BarChart width={200} height={100} data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey={dataKey} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Daydata;
