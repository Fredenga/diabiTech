import { useContext } from "react";
import { lastVal } from "../Predictions/Predictions";
import "./Insights.scss";
import { PredContext } from "../../context/predContext";

const Insights = () => {
  const { predicted } = useContext(PredContext);

  return (
    <div className="insights">
      <div className="top">
        <img src="/forecast.png" alt="forecast" />
        <span>Prediction</span>
      </div>
      <div className="bottom">
        <span className="lastVal">
          {predicted.length > 0 &&
            `Predicted next value: ${Math.round(
              predicted[predicted.length - 1].bg_value
            )} mg/dL`}
        </span>
        <span className="explainer">
          Indicates forecasted value 15 minutes from the most recent measurement
        </span>
      </div>
    </div>
  );
};

export default Insights;
