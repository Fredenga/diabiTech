import { lastVal } from "../Predictions/Predictions";
import "./Insights.scss";

const Insights = () => {
  console.log(lastVal);
  return (
    <div className="insights">
      <div className="top">
        <img src="/forecast.png" alt="forecast" />
        <span>Prediction</span>
      </div>
      <div className="bottom">
        <span className="lastVal">{`Your predicted value: ${Math.round(
          lastVal
        )} mg/dL`}</span>
        <span className="explainer">
          Indicates forecasted value 15 minutes from the most recent measurement
        </span>
      </div>
    </div>
  );
};

export default Insights;
