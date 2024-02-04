import React, { useEffect } from "react";
import FlagsSelect from "react-flags-select";
import { useTranslation } from "react-i18next";
import "./LanguageSelector.css";

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  

  useEffect(() => {
    const preferredLanguage = localStorage.getItem("i18nextLng") || "en";
    // console.log(`preferredLanguage: ${preferredLanguage}`);
    i18n.changeLanguage(preferredLanguage);
  }, [i18n]);

  const changeLanguage = (countryCode) => {
    const langCode = countryCode.split('-')[0].toUpperCase();
    // console.log(langCode);
    i18n.changeLanguage(langCode);
    localStorage.setItem('i18nextLng', langCode);
  };
  

  let selectedLanguage = localStorage.getItem("i18nextLng").toUpperCase() || "EN";
  if(selectedLanguage === "EN"){
    selectedLanguage = "GB";
  }
  // console.log(`----`);
  // console.log(selectedLanguage);

  return (
    <div className="language-selector">
      <label htmlFor="selectLanguage">{t("chooseLanguage")}</label>
      <div className="select-wrapper">
        <FlagsSelect
          // searchable={true}
          countries={["GB", "IS", "PL"]}
          selectedSize={20}
          optionsSize={14}
          fullWidth={false}
          placeholder={t("SelectLanguage")}
          onSelect={changeLanguage}
          // selected={(selectedLanguage || "en").toUpperCase()}
          // selected={"GB"}
          selected={`${selectedLanguage}`}
          // selected={i18n.language || "en"}
        ></FlagsSelect>
      </div>
    </div>
  );
};

export default LanguageSelector;