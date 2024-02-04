import React, { useState, useEffect } from 'react';
import './light-dark-mode.css';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("isDarkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  const setDarkMode = (active) => {
    const root = document.querySelector(":root");
    if (active) {
      root.setAttribute("data-theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    setDarkMode(isDarkMode);
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <button className="dark-mode-toggle" onClick={toggleDarkMode}>
      <span className="dark-mode-toggle__text hidden--visually">
        {isDarkMode ? 'deactivate' : 'activate'} dark mode
      </span>
      <span className="dark-mode-toggle__icon"></span>
    </button>
  );
};

export default DarkModeToggle;
