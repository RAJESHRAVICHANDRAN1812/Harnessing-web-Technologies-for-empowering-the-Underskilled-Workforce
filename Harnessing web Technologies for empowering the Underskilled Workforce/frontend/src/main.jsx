import React, { createContext, useState, Suspense } from "react";
import ReactDOM from "react-dom";
import { ClipLoader } from "react-spinners";
import App from "./App.jsx";
import "./i18n.js";

export const Context = createContext({
  isAuthorized: false,
});

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

const SpinnerContainer = ({ children }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    {children}
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<SpinnerContainer><ClipLoader color="#002349" loading={true} size={150} /></SpinnerContainer>}>
      <AppWrapper />
    </Suspense>
  </React.StrictMode>
);
