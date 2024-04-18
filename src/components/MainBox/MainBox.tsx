import { daymeans, info } from "../../data";
import Daydata from "../Daydata/Daydata";
import Glucose from "../Glucose/Glucose";
import HelloBox from "../HelloBox/HelloBox";
import Limits from "../Limits/Limits";
import Predictions from "../Predictions/Predictions";
import Stats from "../Stats/Stats";
import "./MainBox.scss";

const MainBox = () => {
  return (
    <div className="mainBox">
      <div className="box box1">
        <HelloBox />
      </div>
      <div className="box box2">
        <Glucose {...info} />
      </div>
      <div className="box box3">
        <Limits />
      </div>
      <div className="box box4">
        <Stats />
      </div>
      <div className="box box5">
        <Daydata {...daymeans} />
      </div>
      <div className="box box6">
        <Predictions {...info} />
      </div>
      <div className="box box7">boxes7</div>
      <div className="box box8">boxes8</div>
    </div>
  );
};

export default MainBox;
