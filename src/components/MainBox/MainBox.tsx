import { daymeans, info } from "../../data";
import Daydata from "../Daydata/Daydata";
import Glucose from "../Glucose/Glucose";
import Limits from "../Limits/Limits";
import Stats from "../Stats/Stats";
import "./MainBox.scss";

const MainBox = () => {
  return (
    <div className="mainBox">
      <div className="box box1">
        <div className="textBox">
          <h1>Hello, Jane Cooper</h1>
          <h2>Your blood glucose levels are normal</h2>
          <span>View History</span>
        </div>
        <div className="imgBox">
          {/* <img src="/doctors.jpg" alt="doctors" /> */}
          hello world
        </div>
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
      <div className="box box6">boxes4</div>
      <div className="box box7">boxes5</div>
      <div className="box box8">boxes6</div>
    </div>
  );
};

export default MainBox;
