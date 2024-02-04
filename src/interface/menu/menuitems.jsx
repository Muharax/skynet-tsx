// menuItems.js
import { useTranslation } from "react-i18next";
import { faHome, faCompass, faEnvelope, faRectangleList, faStar,faDiceSix, faCog, faVial, faSignOutAlt, faPersonWalkingDashedLineArrowRight } from '@fortawesome/free-solid-svg-icons';

const useMenuItems = () => {
  const { t } = useTranslation();

  return  [
    // {
    //   id: 0,
    //   name: "",
    //   iconName: "menu",
    //   icon: faBars,
    // },
    {
      id: 0,
      name: t("home"),
      iconName: "home",
      type: "solid",
      icon: faHome,
      path: "/home",
      animation: "fa-beat",
    },
    {
      id: 1,
      name: t("explore"),
      iconName: "compass",
      type: "solid",
      icon: faCompass,
      path: "/explore",
      animation: "fa-beat",
    },
    {
      id: 2,
      name: t("messages"),
      iconName: "envelope",
      type: "solid",
      icon: faEnvelope,
      path: "/messages",
      animation: "fa-beat",
    },
    {
      id: 3,
      name: t("resources"),
      iconName: "spreadsheet",
      type: "solid",
      icon: faRectangleList,
      path: "/resources",
      animation: "fa-beat",
    },
    {
      id: 4,
      name: t("starred"),
      iconName: "star",
      type: "solid",
      icon: faStar,
      path: "/starred",
      animation: "fa-beat",
    },
    {
      id: 5,
      name: t("games"),
      iconName: "dice-6",
      type: "solid",
      icon: faDiceSix,
      path: "/games",
      animation: "fa-beat"
    },
    {
      id: 6,
      name: t("settings"),
      iconName: "cog",
      type: "solid",
      icon: faCog,
      path: "/settings",
      animation: "fa-spin",
    },
    {
      id: 7,
      name: t("test"),
      iconName: "test-tube",
      type: "solid",
      icon: faVial,
      path: "/test",
      animation: "fa-beat",
    },
    {
      id: 8,
      name: t("logout"),
      iconName: "log-out",
      color: "red",
      rotate: "180",
      icon: faPersonWalkingDashedLineArrowRight,
      path: "/logout",
    },
  ];
};

export default useMenuItems;
