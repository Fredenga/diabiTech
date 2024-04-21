import { lastVal } from "../Predictions/Predictions";
import "./Recommendations.scss";

const Recommendations = () => {
  console.log(lastVal);
  return (
    <div className="recommendations">
      <div className="top">
        <img src="/sticky-note.png" alt="forecast" />
        <span>Recommendations</span>
      </div>
      <div className="bottom">
        <span>Consider eating more carbohydrates</span>
      </div>
    </div>
  );
};

export default Recommendations;
