import { useContext } from "react";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Data from "./Pages/Data/Data";
import Home from "./Pages/Home/Home";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AuthContext } from "./context/authContext";

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }: any) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/data" element={<Data />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
