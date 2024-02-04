import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useMenuItems from "./menu/menuitems";
import "boxicons";
import "./menu.css";

const Menu = () => {
  const menuItems = useMenuItems();
  const navigate = useNavigate();
  const location = useLocation();
  const [hovered, setHovered] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [expanded, setExpanded] = useState(() => {
    const savedExpanded = localStorage.getItem("menuExpanded");
    return savedExpanded ? JSON.parse(savedExpanded) : false;
  });

  const [activeTab, setActiveTab] = useState(1);

  const handleItemClick = (index, path) => {
    setActiveTab(index);
    if (path) {
      console.log(`path: ${path}`);
      navigate(path);
    }
    if (index === 0) {
      setExpanded(!expanded);
    }
    return index;
  };

  useEffect(() => {
    // Extract the last part of the pathname as the active tab
    const pathParts = location.pathname.split("/");
    const currentTab = pathParts[pathParts.length - 1];

    const selectedItem = menuItems.find(
      (item) => item.path === location.pathname
    );

    setActiveTab(selectedItem ? selectedItem.id : activeTab);
    // setActiveTab(currentTab);
    console.log(`activeTab: ${activeTab}`);
    console.log(`currentTab: ${currentTab}`);
  }, [location]);

  useEffect(() => {
    localStorage.setItem("menuExpanded", JSON.stringify(expanded));
  }, [expanded]);


  let delay = 1;
  useEffect(() => {
    setAnimate(true);
    let timer = setTimeout(() => setAnimate(false), delay * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [activeTab]);




  return (
    <div className={`sidebar ${expanded && "expanded"}`}>
      {menuItems.map((item, index) => {
        let middle = !(index === 0 || index === menuItems.length - 1);

        return (
          <Link
            key={index}
            to={item.path || "/"} // Ustaw domyślną ścieżkę, jeśli nie ma określonej
            className={`boxicon-container ${
              expanded && "expanded-boxicon-container"
            }
            `}
            onClick={() => handleItemClick(index, item.path)}
          >
            <box-icon
              class={`${middle && "boxicon"} 
                      ${!middle && "first-and-last-trash-fix"}
                      ${activeTab === index ? "active" : ""}
                      `}
              size="md"
              name={item.iconName}
              type={item.type}
              color={
                hovered === index || activeTab === index ? "white" : item.color
              }
              animation={activeTab === index && animate ? "tada" : ""}
              rotate={item.rotate}
            ></box-icon>
            <p
              className={`description 
            ${expanded && "show-description"}
            ${activeTab === index && "active-description"}`}
            >
              {item.name}
            </p>
          </Link>
        );
      })}
    </div>
  );
};
export default Menu;