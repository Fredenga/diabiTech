import Mainbar from "../../components/Mainbar/Mainbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <Mainbar />
    </div>
  );
};

export default Home;
