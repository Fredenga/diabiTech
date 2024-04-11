import MainBox from "../MainBox/MainBox";
import TopBox from "../TopBox/TopBox";
import "./Mainbar.scss";

const Mainbar = () => {
  return (
    <div className="mainbar">
      <TopBox />
      <MainBox />
    </div>
  );
};

export default Mainbar;
