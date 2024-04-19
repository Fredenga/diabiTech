import UseSpeechToText from "../../hooks/useSpeechToText";
import "./TopBox.scss";

const TopBox = () => {
  return (
    <div className="topbox">
      <div className="topBar">
        <h1>Health Care</h1>
        <div className="right">
          <img src="/settings.png" alt="notifications" />

          <UseSpeechToText />
        </div>
      </div>
    </div>
  );
};

export default TopBox;
