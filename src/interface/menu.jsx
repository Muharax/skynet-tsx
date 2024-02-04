import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import useMenuItems from "./menu/menuitems";

import "./menu.css";

const Menu = () => {
  const menuItems = useMenuItems();
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(() => {
    const savedExpanded = localStorage.getItem("menuExpanded");
    return savedExpanded ? JSON.parse(savedExpanded) : false;
  });

  // const [activeTab, setActiveTab] = useState(1);
  const [activeTab, setActiveTab] = useState(() => {
    const selectedItem = menuItems.find((item) => location.pathname.includes(item.path));
    return selectedItem ? selectedItem.id : 0;
  });

  const toggleMenu = () => {
    setExpanded(!expanded);
  };

  const handleItemClick = (index, path) => {
    setActiveTab(index);
    if (path) {
      navigate(path);
    }
    return index;
  };

  useEffect(() => {
    const selectedItem = menuItems.find((item) => item.path === location.pathname);
  
    if (selectedItem) {
      setActiveTab(selectedItem ? selectedItem.id : activeTab);
    }
  }, [location.pathname, menuItems, location]);

  useEffect(() => {
    localStorage.setItem("menuExpanded", JSON.stringify(expanded));
  }, [expanded]);

  return (
    <div className={`sidebar ${expanded ? "expanded" : "no-expanded"}`}>
      <div
        key={0}
        className={`menu-item ${expanded ? "expanded-menu-item" : "no-expanded-menu-item"}`}
        onClick={() => toggleMenu()}
      >
        <div className="menu-ico">
          <FontAwesomeIcon
            icon={faBars}
            className={` ${activeTab === 0 ? "activeTab" : ""}`}
            size="xl"
            style={{color: "black"}}
          />
        </div>
      </div>

      {menuItems.map((item, index) => {
        return (
          <Link
            key={index}
            to={item.path || ""}
            title={item.name}
            className={`menu-item ${expanded ? "expanded-menu-item" : "no-expanded-menu-item"}`}
            onClick={() => handleItemClick(index, item.path)}
          >
            <div className="menu-ico">
              <FontAwesomeIcon
                icon={item.icon}
                className={`
                  ${activeTab === index ? "activeTab" : ""}
                  ${activeTab === index ? item.animation : ""}
                      `}
                size="xl"
                color={activeTab === index ? "" : item.color}
              />
            </div>
            <div
              className={`description
            ${expanded ? "show-description" : ""}
            ${activeTab === index && "active-description"}`}
            >
              {item.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Menu;
