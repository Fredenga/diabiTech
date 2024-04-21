import { signOut } from "firebase/auth";
import { auth } from "../../firebase"; // Replace with your Firebase auth instance

const LogoutSpan = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Optionally update UI state
      console.log("User successfully logged out");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return <span onClick={handleLogout}>Logout</span>;
};

export default LogoutSpan;
