import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  fetchNotifications,
  getNotifications,
} from "../../AuthContext/EndPoints";
import "./notifications.css"; // Import stylów CSS dla modala
// import pipboy from '../../img/pipboy.png';

// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Notifications = () => {
  const { t } = useTranslation();
  const [notificationCounts, setNotificationCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const lii = 1;

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const data = await getNotifications();
        // console.log("getNotifications:", data);
        // setShowModal(!showModal);
        setNotifications(data);
      } catch (error) {
        console.error("Błąd getNotifications:", error);
      }
    };
    fetchDatas();
  }, [showModal]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchNotifications(lii);
        // console.log("Response from fetchNotifications:", data);
        setNotificationCount(data);
        // console.log("Updated notificationCount:", data);
      } catch (error) {
        console.error("Błąd pobierania powiadomień:", error);
      }
    };

    fetchData();
  }, []);

  const openNotification = () => {
    setShowModal(!showModal);
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="custom-modal">
      <button
        className={isOpen ? "btn-open" : ""}
        onClick={() => openNotification()}
      >
        {t("notifications")} {notificationCounts}
      </button>

      {showModal && (
        <div className="notificationsModal">
          {/* <div><img src={pipboy} /></div> */}
          <div className="modal-content">
            <div className="bbn">
              <span className="btn-close2" onClick={() => openNotification()}>
                ×
              </span>
            </div>
            <h3>
              {t("notifications")} {notificationCounts}
            </h3>
            <button>Odznacz wszystkie</button>
            <div className="notification-main">
              {notifications.map((notification) => (
                <div className="not-main" key={notification.id}>
                  <div>
                    <div className="label">{t("info")}</div>
                    <div className="value">: {notification.info}</div>
                  </div>
                  <div>
                    <div className="label">{t("error")}</div>
                    <div className="value">: {notification.error}</div>
                  </div>
                  <div>
                    <div className="label">{t("time")}</div>
                    <div className="value">: {notification.time}</div>
                  </div>
                  <div>
                    <div className="label">{t("desc")}</div>
                    <div className="value">: {notification.desc}</div>
                  </div>

                  <div>
                    <button>Like</button>
                    <button>Ok</button>
                    <button>X</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
