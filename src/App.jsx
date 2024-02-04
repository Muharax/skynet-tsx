import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./Home/Home";
import Games from "./game/games";
import Menu from "./interface/menu";
import Test from "../src/test/test";
import {
  Settings,
  GeneralSettings,
  AppearanceSettings,
} from "./interface/settings/settings";
import CookieDescription from "./interface/settings/cookie/cookieDescription";
import i18n from "./language/i18n";
import Messages from "./Messages/Messages";
import Protected from "./AuthContext/Protected";
import { useAuth } from "./AuthContext/AuthContext";
import Logout from "./AuthContext/Logout";
import Login from "./AuthContext/Login/Login";
import Error404 from "./HTTP/Error404/Error404";

import './App.css';

function App() {
  // const { isLoggedIn, isAuthenticated } = useAuth();

  useEffect(() => {
    const preferredLanguage =
      localStorage.getItem("i18nextLng").toUpperCase() || "EN";
    i18n.changeLanguage(preferredLanguage);
  }, []);

  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem("isDarkMode"));
    const root = document.querySelector(":root");
    root.setAttribute("data-theme", savedDarkMode ? "dark" : "light");
  }, []);

  return (
    <Router>
      <>
      {/* {isAuthenticated() ? ( */}
        <div style={{ display: "flex", height: "100vh" }}>
          <Menu />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route
                path="/messages"
                element={
                  <Protected>
                    <Messages />
                  </Protected>
                }
              />
              <Route path="/settings" element={<Settings />}>
                <Route path="general" element={<GeneralSettings />} />
                <Route path="appearance" element={<AppearanceSettings />} />
                <Route path="cookie" element={<CookieDescription />} />
              </Route>
              <Route path="/games" element={<Games />} />
              <Route path="/test" element={<Test />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </div>
        </div>
      {/* ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/logout" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} index/>
          <Route path="*" element={<Error404 />} />
        </Routes>
      )} */}
      </>
    </Router>
  );
}

export default App;
