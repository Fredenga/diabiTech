import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import "./Daydata.scss";
import { useContext } from "react";
import { DataContext } from "../../context/dataContext";
import { DayMeanValues } from "../../math/mean";

const Daydata = () => {
  const { data } = useContext(DataContext);
  const means = DayMeanValues(data);
  return (
    <div className="daydata">
      <span>Date Mean Values</span>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <BarChart width={200} height={100} data={means}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />
            <Bar dataKey="mean_value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Daydata;
