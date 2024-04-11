import Mainbar from "../../components/Mainbar/Mainbar";
import Rightbar from "../../components/Rightbar/Rightbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <Mainbar />
      {/* <Rightbar /> */}
    </div>
  );
};

export default Home;
