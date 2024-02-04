import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../AuthContext/AuthContext";
import {
  getMessagesCount,
  getFullMessages,
  getMessagesUser,
  sendMessages,
} from "../../AuthContext/EndPoints";
import "./messages.css";

const Messages = ({}) => {
  const { currentUser } = useAuth();
  const { t } = useTranslation();
  const [messageCount, SetMessageCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isMessages, setIsMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [isUserId, setUserId] = useState(null);
  const { currentId } = useAuth();
  const [isMsgDesc, setMsgDesc] = useState("");
  const [placeholderText, setPlaceholderText] = useState("Write something...");
  const [isMsg, setMsg] = useState(false);
  const messagesMainRef = useRef(null);


  useEffect(() => {
    setMsg(false);
    const fetchDataso = async () => {
      try {
        const data = await getMessagesUser(isUserId);
        setIsMessages(data.messages);
        console.log("BOSZE " + JSON.stringify(data));
      } catch (error) {
        console.error("Błąd getmessages:", error);
      }
    };
    fetchDataso();
  }, [isUserId, isMsg]);

  const handleChatSend = async () => {
    console.log("ZZZZZZZZZZZZZZZZZZZ" + isUserId);
    console.log("ZZZZZZZZZZZZZZZZZZZ" + currentId);
    console.log("ZZZZZZZZZZZZZZZZZZZ" + isMsgDesc);
    try {
      const startsendMessage = await sendMessages(
        isUserId,
        currentId,
        isMsgDesc
      );
      if (startsendMessage.success === true) {
        console.log(startsendMessage.success);
        setMsg(startsendMessage.success);
        setMsgDesc("");
        // setMsg(startsendMessage.success);

        console.log(`handleChatSend->${startsendMessage.success === true}`);
      }
    } catch (error) {
      console.error("Błąd sendMessages:", error);
    }
  };

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const data = await getFullMessages();
        setMessages(data.messages);
      } catch (error) {
        console.error("Błąd getmessages:", error);
      }
    };
    fetchDatas();
  }, [showModal]);

  useEffect(() => {
    const fetchDatase = async () => {
      try {
        const data = await getMessagesCount();
        console.log(
          "messages->USE->fetchDatase -> getMessage() -> result:",
          data
        );
        SetMessageCount(data);
      } catch (error) {
        console.error("Błąd getMessagesCount:", error);
      }
    };
    fetchDatase();
  }, []);

  const openMessages = () => {
    setShowModal(!showModal);
    setIsOpen((prevIsOpen) => !prevIsOpen);
    if (messagesMainRef.current) {
      console.log("997");
      messagesMainRef.current.scrollTo({
        top: messagesMainRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const getUserMessages = (id) => {
    setUserId(id);
    console.log("K > " + id);
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
              <div className="msg-userlist"></div>

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

              <div>
                <div className="messages-main-p">
                  {messages.map((messageIS) => (
                    <div className="not-mains" key={messageIS.ids}>
                      <div>
                        <div className="value">
                          <input
                            type="button"
                            className="chat-user-image"
                            onClick={() => getUserMessages(messageIS.ids)}
                            value={messageIS.user}
                          />
                          <span>({messageIS.message_count})</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                wiadomości
                {isMessages.map((allaha) => (
                  <div
                    className={`not-mains ${
                      allaha.from_user === currentUser
                        ? "sent-by-me"
                        : "sent-by-others"
                    }`}
                    key={allaha.time}
                  >
                    <div>
                      <div className="value">
                        od {allaha.from_user} do {allaha.to_user}
                      </div>
                    </div>
                    <div>
                      <div className="value"> {allaha.time}</div>
                    </div>
                    <div>
                      <div className="value"> {allaha.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div>
                  {isMsg && (
                    <div className="responseDiv">
                      Odpowiedź z serwera: {isMsg}
                    </div>
                  )}

                  <textarea
                    className={`messagesInput`}
                    placeholder={placeholderText}
                    value={isMsgDesc}
                    onChange={(e) => setMsgDesc(e.target.value)}
                    disabled={isUserId === null}
                  />
                  <button onClick={handleChatSend} disabled={isUserId === null}>
                    Wyślij
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
