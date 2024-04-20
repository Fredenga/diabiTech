import { useContext } from "react";
import "./Stats.scss";
import { DataContext } from "../../context/dataContext";

const Stats = () => {
  const { data } = useContext(DataContext);
  const recent = data[data.length - 1];

  return (
    <div className="stats">
      <div className="top">
        <img src="/blood.png" alt="blood" />
        <span>Stats</span>
      </div>
      {data && (
        <div className="bottom">
          <span>{`Recent Value: ${recent.glucoseData.bg_value}mg/dL`}</span>
          <span>Today's Mean Value: 120mg/dL</span>
          <span>Variability: 5mg/dL</span>
        </div>
      )}
      <div className="info">Blood glucose levels are stable</div>
    </div>
  );
};

export default Stats;
