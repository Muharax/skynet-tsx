import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./cookieDescription.css";
import GeneralCookies from "./learnMore/generalCookies";
import tabsData from "./learnMore/tabsData";

const CookieDescription = () => {
  const { t } = useTranslation();

  const handleLearnMoreClick = (link) => {
    console.log("Learn more clicked:", link);
  };

  const handleCheckboxChange = (cookieType) => {
    // setCookieSettings((prevSettings) => ({
    //   ...prevSettings,
    //   [cookieType]: {
    //     ...prevSettings[cookieType],
    //     checked: !prevSettings[cookieType].checked,
    //   },
    // }));
  };

  return (
    <div className="cookie-description">
      <div className="cookie-description-general-zero">
        <div className="cookie-checkboxes">
          <div className="cookie-title">
            <h3>{t("cookieDescription.title")}</h3>
            <p>{t("cookieDescription.subtitle")}</p>
          </div>
          <div className="cookie-list">
            {tabsData.map((tab) => (
              <div key={tab.id}>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={tab.checked}
                    disabled={tab.disabled}
                    onChange={() => handleCheckboxChange(tab.title)}
                  />
                  {t(`cookieDescription.${tab.title}`)}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="cookie-description-general">
          <GeneralCookies />
        </div>
      </div>
    </div>
  );
};

export default CookieDescription;
