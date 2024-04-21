import { useContext, useEffect, useState } from "react";
import "./Stats.scss";
import { DataContext, GlucoseData } from "../../context/dataContext";
import { calculateMeanValues } from "../../math/mean";
import { calculateStdDevPerDay } from "../../math/std_dev";

export let day_val: any = {};
const Stats = () => {
  const [stateData, setStateData] = useState({
    entry_id: 0,
    glucoseData: { bg_value: 0, timestamp: "" }
  });
  const [stateMean, setStateMean] = useState(0);
  const [stateStdDev, setStateStdDev] = useState(0);
  const { data } = useContext(DataContext);
  function sayText(recent: GlucoseData): string {
    let text: string = "hello";
    if (recent.glucoseData.bg_value < 80) {
      text = "Your blood glucose levels are below the minimum threshold";
    } else if (recent.glucoseData.bg_value > 180) {
      text = "Your blood glucose levels are above the maximum threshold";
    } else {
      text = "Your blood glucose levels are normal";
    }
    return text;
  }
  useEffect(() => {
    const recent = data[data.length - 1];
    setStateData(recent);
    let means: Record<string, { count: number; sum: number; mean: number }> =
      {};
    let std: {
      date: string;
      std_dev: number;
    }[] = [];
    means = calculateMeanValues(data);
    std = calculateStdDevPerDay(data);
    const keys = Object.keys(means);
    const lastKey = keys.length > 0 ? keys[keys.length - 1] : undefined;

    const mean = means[lastKey || ""];

    const main_std =
      std.length > 0 ? std[std.length - 1] : { date: "", std_dev: 0 };
    setStateMean(mean.mean);
    setStateStdDev(main_std.std_dev);

    day_val = {
      std_dev: main_std.std_dev,
      mean: mean.mean,
      value: recent.glucoseData.bg_value
    };
    console.log(mean.mean);
  });

  return (
    <div className="stats">
      <div className="top">
        <img src="/blood.png" alt="blood" />
        <span>Stats</span>
      </div>
      {stateData.entry_id !== 0 ? (
        <>
          <div className="bottom">
            <span className="val">{`Recent Value: ${stateData.glucoseData.bg_value}mg/dL`}</span>
            {stateMean !== 0 ? (
              <span>{`Today's Mean Value: ${
                Math.round(stateMean) || 0
              }mg/dL`}</span>
            ) : (
              <></>
            )}
            <span>{`Variability: ${stateStdDev}mg/dL`}</span>
          </div>

          <div className="info">
            {stateData.entry_id !== 0 && sayText(stateData)}
          </div>
        </>
      ) : (
        <>Fetching Data...</>
      )}
    </div>
  );
};

export default Stats;
