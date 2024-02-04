import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import DarkModeToggle from "../light-dark-mode/light-dark-mode";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../../language/LanguageModal/LanguageSelector";
import i18n from "../../language/i18n";
import "./settings.css";

function GeneralSettings() {
  const { t } = useTranslation();
  return (
    <div>
      <h3>{t("generalSettings")}</h3>
      <LanguageSelector />
    </div>
  );
}

function AppearanceSettings() {
  const { t } = useTranslation();
  return (
    <div>
      <h3>{t("AppearanceSettings")}</h3>
      <DarkModeToggle />
    </div>
  );
}

function Settings() {
  const { t } = useTranslation();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    // Extract the last part of the pathname as the active tab
    const pathParts = location.pathname.split("/");
    const currentTab = pathParts[pathParts.length - 1];
    setActiveTab(currentTab);
  }, [location]);


  return (
    <div className="settings">
      <div className="min-222">
        <Link to="general">
          <div className={`options ${activeTab === "general" ? "activee" : ""}`}>
            {t("generalSettings")}
          </div>
        </Link>
        <Link to="appearance">
          <div className={`options ${activeTab === "appearance" ? "activee" : ""}`}>
            {t("AppearanceSettings")}
          </div>
        </Link>
        <Link to="cookie">
          <div className={`options ${activeTab === "cookie" ? "activee" : ""}`}>
            {t("cookie")}
          </div>
        </Link>
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}
export { GeneralSettings, AppearanceSettings, Settings };