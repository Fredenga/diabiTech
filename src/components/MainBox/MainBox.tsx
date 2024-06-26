import Daydata from "../Daydata/Daydata";
import Glucose from "../Glucose/Glucose";
import HelloBox from "../HelloBox/HelloBox";
import Insights from "../Insights/Insights";
import Limits from "../Limits/Limits";
import Predictions from "../Predictions/Predictions";
import Recommendations from "../Recommendation/Recommendation";
import Stats from "../Stats/Stats";
import "./MainBox.scss";

const MainBox = () => {
  return (
    <div className="mainBox">
      <div className="box box1">
        <HelloBox />
      </div>
      <div className="box box2">
        <Glucose />
      </div>
      <div className="box box3">
        <Limits />
      </div>
      <div className="box box4">
        <Stats />
      </div>
      <div className="box box5">
        <Daydata />
      </div>
      <div className="box box6">
        <Predictions />
      </div>
      <div className="box box7">
        <Insights />
      </div>
      <div className="box box8">
        <Recommendations />
      </div>
    </div>
  );
};

export default MainBox;
