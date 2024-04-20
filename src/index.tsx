import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/authContext";
import { DataContextProvider } from "./context/dataContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthContextProvider>
    <DataContextProvider>
      <App />
    </DataContextProvider>
  </AuthContextProvider>
);
reportWebVitals();
