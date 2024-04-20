import { useContext } from "react";
import "./Stats.scss";
import { DataContext, GlucoseData } from "../../context/dataContext";
import { calculateMeanValues } from "../../math/mean";
import { calculateStdDevPerDay } from "../../math/std_dev";

export function sayText(recent: GlucoseData): string {
  let text: string;
  if (recent.glucoseData.bg_value < 80) {
    text = "Your blood glucose levels are below the minimum threshold";
  } else if (recent.glucoseData.bg_value > 180) {
    text = "Your blood glucose levels are above the maximum threshold";
  } else {
    text = "Your blood glucose levels are normal";
  }
  return text;
}

const Stats = () => {
  const { data } = useContext(DataContext);
  const recent = data[data.length - 1];
  const means = calculateMeanValues(data);
  const keys = Object.keys(means);
  const lastKey = keys.length > 0 ? keys[keys.length - 1] : undefined;

  const mean = means[lastKey || ""];

  const std = calculateStdDevPerDay(data);
  const main_std = std[std.length - 1];

  return (
    <div className="stats">
      <div className="top">
        <img src="/blood.png" alt="blood" />
        <span>Stats</span>
      </div>
      {data && (
        <div className="bottom">
          <span className="val">{`Recent Value: ${recent.glucoseData.bg_value}mg/dL`}</span>
          <span>{`Today's Mean Value: ${Math.round(mean.mean)}mg/dL`}</span>
          <span>{`Variability: ${main_std.std_dev}mg/dL`}</span>
        </div>
      )}
      <div className="info">{sayText(recent)}</div>
    </div>
  );
};

export default Stats;
