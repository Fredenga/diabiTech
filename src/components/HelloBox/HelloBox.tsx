import "./HelloBox.scss";
import { useContext } from "react";

import { AuthContext } from "../../context/authContext";

const HelloBox = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="hellobox">
      <div className="textBox">
        <h1>{`Hello, ${currentUser?.displayName}`}</h1>
        <h2>Your blood glucose levels are normal</h2>
        <span>View History</span>
      </div>
      <div className="imgBox">
        <img src="/doctors.jpg" alt="doctors" />
      </div>
    </div>
  );
};

export default HelloBox;
