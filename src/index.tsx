import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/authContext";
import { DataContextProvider } from "./context/dataContext";
import { PredContextProvider } from "./context/predContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthContextProvider>
    <DataContextProvider>
      <PredContextProvider>
        <App />
      </PredContextProvider>
    </DataContextProvider>
  </AuthContextProvider>
);
reportWebVitals();
