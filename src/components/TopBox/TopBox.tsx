import UseSpeechToText from "../../hooks/useSpeechToText";
import "./TopBox.scss";
import MicIcon from "@mui/icons-material/Mic";
const TopBox = () => {
  return (
    <div className="topbox">
      <div className="topBar">
        <h1>Health Care</h1>
        <div className="right">
          {/* <img src="/settings.png" alt="notifications" /> */}
          <MicIcon className="icon" />
          <UseSpeechToText />
        </div>
      </div>
    </div>
  );
};

export default TopBox;
