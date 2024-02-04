import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import logo from "../../img/logo.png";
// import rop from "../../img/rop.png";
// import rop from "../../img/rop-hitman.png";
import skynetDivision from "../../img/skynet-division.png";

import "./Login.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const { login, authError, isSuccess, currentUser, isAuthenticated } =
    useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("ADMIN11");
  const [password, setPassword] = useState("admino");

  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // console.log("Login -> handleSubmit (click)");
      await login(username, password);

      // setIsLoginMode(false);
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div className="LOGOWANIE">
      {authError && <div className="error-message">{authError}</div>}

      {/* <img title="GPS" className="rop" src={rop} alt="ROP" /> */}

      {isAuthenticated() ? (
        <div className="close-btn">
          <Link to={`/login`}>
            <span>X</span>
          </Link>
        </div>
      ) : (
        ""
      )}

      <div className="LG">
        <div className="logos">
          <img src={logo} alt="" className="logos-SWG" />
        </div>

        <div id="logowanie-s">
          <form onSubmit={handleSubmit}>
            <div className="name">
              <FontAwesomeIcon icon={faUser} />
              <input
                type="text"
                id="first"
                autoComplete="off"
                autoFocus
                name="user"
                placeholder="Login"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w100"
              />
            </div>

            <div className="pass">
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                id="second"
                autoComplete="off"
                name="pass"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w100"
              />
            </div>

            <div id="btn-log-in">
              <div className="wrapper">
                <div className="box">
                  <button type="submit" className="log-in" id="sub">
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div>
          <img title="Welcome" className="skynet-division" src={skynetDivision} />
        </div>

      </div>
    </div>
  );
};

export default Login;
