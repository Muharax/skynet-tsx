import React, { createContext, useContext, useState, useEffect } from "react";
import { URL } from "../config";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [tokenExp, setTokenExp] = useState(null);
  const [isStart, setStart] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isSuccess, setSuccess] = useState(false);
  const [isRole, setRole] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const tokenExpirationTime = decodedToken.exp * 1000;

        if (tokenExpirationTime > Date.now()) {
          setIsLoggedIn(true);
          setCurrentUser(decodedToken.user);
          setCurrentId(decodedToken.ids);
          setRole(decodedToken.role);
          setTokenExp(tokenExpirationTime);
        } else {
          setIsLoggedIn(false);
          // <Navigate to="/login" />;
        }
      } catch (error) {
        // console.error("Błąd dekodowania tokena:", error.message);
        setIsLoggedIn(false);
        // <Navigate to="/login" />;
      }
    } else {
      setIsLoggedIn(false);
      // <Navigate to="/login" />
    }
  }, [isStart]);


  const addTokenToHeaders = () => {
    const token = localStorage.getItem("token");
    // console.log(`Token: ${token}`);
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  };

  const login = async (username, password) => {
    const headers = addTokenToHeaders();
    try {
      const response = await fetch(`${URL}/logowanie`, {
        method: "post",
        // mode: 'same-origin',
        // redirect: 'follow',
        credentials: 'include',
        headers: headers,
        body: JSON.stringify({ username, password }),
      });


      if (!response.ok) {
        const errorData = await response.json(); // Pobierz dane błędu z serwera
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
      }


      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }

      const data = await response.json();

      // console.log("----- AuthContext Logowanie response:", data);

      if (data.success) {
        if (data.token) {
          const decodedToken = jwtDecode(data.token);
          const fifteenMinutesInMilliseconds = 15 * 60 * 1000;
          const tokenValidUntil = Date.now() + fifteenMinutesInMilliseconds;
          // console.log(
          //   `AuthContext -> login -> decodedToken OBJECT: ${decodedToken}`
          // );
          // console.log(
          //   "--- decodedToken JSON.stringify: " +
          //     JSON.stringify(decodedToken, null, 2)
          // );

          if (decodedToken.exp * 1000 > tokenValidUntil) {
            // console.log(`${decodedToken.exp * 1000} > ${tokenValidUntil}`);
            localStorage.setItem("user", decodedToken.user);
            localStorage.setItem("role", decodedToken.role);
            localStorage.setItem("token", data.token);

            setIsLoggedIn(true);
            setCurrentUser(decodedToken.user);
            setCurrentId(decodedToken.ids);
            setRole(decodedToken.role);
            setTokenExp(decodedToken.exp * 1000);
            setSuccess(true);
            setStart(true);
          } else {
            setAuthError("Token expired");
          }
        } else {
          setAuthError("Token not provided in the response");
        }

        const decodedToken = jwtDecode(data.token);
        const fifteenMinutesInMilliseconds = 15 * 60 * 1000;
        const tokenValidUntil = Date.now() + fifteenMinutesInMilliseconds;
        // console.log(decodedToken.exp * 1000 > tokenValidUntil);
        if (decodedToken.exp * 1000 > tokenValidUntil) {
          localStorage.setItem("user", decodedToken.user);
          localStorage.setItem("role", decodedToken.role);
          localStorage.setItem("token", data.token);

          setIsLoggedIn(true);
          setCurrentUser(decodedToken.user);
          setCurrentId(decodedToken.ids);
          setTokenExp(decodedToken.exp * 1000);
          setSuccess(true);
          setStart(true);
        }
      } else {
        const errorMessage = data.message || "Login unsuccessful";
        setAuthError("T:" + errorMessage);
        setSuccess(false);
        setIsLoggedIn(false);
        // setStart(true);
      }
    } catch (error) {
      // console.error("Error during login:", error.message);
      setAuthError(error.message);
    }
  };

  const logout = async () => {
    // console.log("Logout -> START");
    const headers = addTokenToHeaders();
    // console.log("Logging out...Starting...");

    try {
      const response = await fetch(`${URL}/logout`, {
        method: "post",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setIsLoggedIn(false);
        setCurrentUser(null);
        setCurrentId(null);
        setStart(false);
        setSuccess(false);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        // console.log("Logout response:", data);
        // console.log("Logout -> END");
      }
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  const isAuthenticated = () => {
    return isLoggedIn;
  };

  const isAdmin = (user) => {
    return user && isRole === "admin";
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        isAuthenticated,
        currentUser,
        authError,
        isSuccess,
        isAdmin,
        isRole,
        currentId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
