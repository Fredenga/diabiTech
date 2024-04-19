import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logoContainer">
        <span>W</span>
        <h1>DiabiTech</h1>
      </div>
      <div className="iconsContainer">
        <Link to="/" className="icon">
          {/* <img src="/home.png" alt="home" /> */}
          <HomeIcon className="mainIcon" />
          <span>Home</span>
        </Link>
        <div className="icon">
          <img src="/info-button.png" alt="about" />
          <span>About</span>
        </div>
        <Link to="/data" className="icon">
          <img src="/analytics.png" alt="" />
          <span>Data</span>
        </Link>
        <div className="icon">
          <img src="/profile.png" alt="" />
          <span>Profile</span>
        </div>
        <div className="icon">
          <img src="/settings.png" alt="" />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
