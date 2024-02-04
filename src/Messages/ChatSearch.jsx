import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { fetchMessages, getMessages } from "../../AuthContext/EndPoints";
import "./messages.css"; // Import stylów CSS dla modala
import ChatSend from "./ChatSend";
// import pipboy from '../../img/pipboy.png';

// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Messages = () => {
  const { t } = useTranslation();
  const [messageCount, SetMessageCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const lii = 1;
  const messagesMainRef = useRef(null);

  useEffect(() => {
    const fetchDatase = async () => {
      try {
        const data = await getMessages();
        console.log("getmessages:", data);
        setMessages(data);
      } catch (error) {
        console.error("Błąd getmessages:", error);
      }
    };
    fetchDatase();
  }, [showModal]);

  useEffect(() => {
    console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    const fetchDatae = async () => {
      try {
        const data = await fetchMessages(lii);
        console.log("Response from fetchMessages:", data);
        SetMessageCount(data);
        console.log("Updated notificationCount:", data);
      } catch (error) {
        console.error("Błąd pobierania powiadomień:", error);
      }
    };

    fetchDatae();
  }, []);

  useEffect(() => {
    if (messagesMainRef.current) {
      messagesMainRef.current.scrollTo({
        top: messagesMainRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]); // Nasłuchiwanie zmian w messages

  const openMessages = () => {
    setShowModal(!showModal);
    setIsOpen((prevIsOpen) => !prevIsOpen);
    if (messagesMainRef.current) {
      console.log("997");
      console.log("NNNN: " + messagesMainRef.current);
      messagesMainRef.current.scrollTo({
        top: messagesMainRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="custom-modal">
      <button
        className={isOpen ? "btn-open" : ""}
        onClick={() => openMessages()}
      >
        {t("messages")} {messageCount}
      </button>

      {showModal && (
        <div className="messagesModal">
          <div className="modal-contenttt tt">
            <div className="btn-msg-1">
              <div className="lupa">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="8.5" cy="8.5" r="6" />
                  <line x1="14" y1="14" x2="18" y2="18" />
                  <line x1="10" y1="14" x2="14" y2="18" />
                  <line x1="6" y1="14" x2="10" y2="18" />
                </svg>
              </div>
              <div> {/* <button>Dodaj</button> */}</div>
            </div>

            <div>
              <div>
                <div className="bbn">
                  <span className="btn-close2" onClick={() => openMessages()}>
                    ×
                  </span>
                </div>
                <h3>
                  {t("messages")} {messageCount}
                </h3>
                <div>
                  <button>Odznacz wszystkie</button>
                </div>
              </div>

              <div className="messages-main" ref={messagesMainRef}>
                {messages.map((messageIS) => (
                  <div className="not-mains" key={messageIS.id}>
                    <div>
                      <div className="label">{t("info")}</div>
                      <div className="value">: {messageIS.info}</div>
                    </div>
                    <div>
                      <div className="label">{t("error")}</div>
                      <div className="value">: {messageIS.error}</div>
                    </div>
                    <div>
                      <div className="label">{t("time")}</div>
                      <div className="value">: {messageIS.time}</div>
                    </div>
                    <div>
                      <div className="label">{t("desc")}</div>
                      <div className="value">: {messageIS.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div>
                  <button>EMOI</button>
                  <button>PHOTO</button>
                  <button>PHOTO</button>
                </div>
                <ChatSend />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
