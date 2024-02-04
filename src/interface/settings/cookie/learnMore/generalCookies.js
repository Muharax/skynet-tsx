import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./generalCookies.css";
import tabsData from "./tabsData";

const GeneralCookies = (props) => {
  const { t } = useTranslation();
  const { title, content } = props;
  const [activeTabIndex, setActiveTabIndex] = useState(1);
  const [highlightWidth, setHighlightWidth] = useState(0);
  const [highlightPosition, setHighlightPosition] = useState(0);

  useEffect(() => {
    handleHighlight(
      document.querySelector(`.tabs__tab[data-index="${activeTabIndex}"]`)
    );
  }, [activeTabIndex]);

  // When a tab is selected
  const handleTabSelection = (tab) => {
    setActiveTabIndex(tab.getAttribute("data-index"));
    handleHighlight(tab);
  };

  // To position and size the highlight
  const handleHighlight = (tab) => {
    let navRect = document.querySelector(".tabs__nav").getBoundingClientRect();
    let highlightRect = tab.getBoundingClientRect();
    let tabWidth = tab.offsetWidth;

    setHighlightWidth(tabWidth);
    setHighlightPosition(highlightRect.left - navRect.left);
  };

  // Init the highlight
  useEffect(() => {
    handleHighlight(document.querySelector(".tabs__tab:nth-child(1)"));
  }, []);

  return (
    <div className="cook">
      <main className="tabs">
        <nav className="tabs__nav">
          {tabsData.map((tab) => {
            return (
              <div
			  	key={tab.id} 
                className="tabs__tab"
                data-index={tab.id}
                onClick={(e) => handleTabSelection(e.target)}
              >
                {/* <span className="material-symbols-outlined">{tab.icon}</span> */}
                {t(`cookieDescription.${tab.title}`)}
              </div>
            );
          })}
          <div
            className="tabs__highlight"
            style={{
              left: highlightPosition + "px",
              width: highlightWidth + "px",
            }}
          ></div>
        </nav>
        {tabsData.map((tab) => {
          if (tab.id != activeTabIndex) return;
          return (
            <section key={tab.id} className="tabs__content">
              <div>{tab.content}</div>
            </section>
          );
        })}
      </main>
    </div>
  );
};

export default GeneralCookies;
