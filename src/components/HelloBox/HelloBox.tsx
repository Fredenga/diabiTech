import "./HelloBox.scss";
import { useContext } from "react";

import { AuthContext } from "../../context/authContext";
import { DataContext } from "../../context/dataContext";
import { sayText } from "../Stats/Stats";
import { Link } from "react-router-dom";

const HelloBox = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(DataContext);
  const recent = data[data.length - 1];

  return (
    <div className="hellobox">
      <div className="textBox">
        <h1>{`Hello, ${currentUser?.displayName}`}</h1>
        <h2>{sayText(recent)}</h2>
        <span>
          <Link className="span" to="/data">
            View History
          </Link>
        </span>
      </div>
      <div className="imgBox">
        <img src="/doctors.jpg" alt="doctors" />
      </div>
    </div>
  );
};

export default HelloBox;
