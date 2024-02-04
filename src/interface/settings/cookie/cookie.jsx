import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import './cookie.css';

function Cookie() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentLocation = useLocation();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLinkClick = () => {
    closeModal();
  };

  const isCiasteczkaPath = currentLocation.pathname === "/ciasteczka";

  return (
    <>
      <div className="cookie">
        <button onClick={openModal} disabled={isCiasteczkaPath}>
          {t('cookie')}
        </button>
      </div>

      {isModalOpen && (
        <div className="ios">
          <div className="content-ios">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>Tutaj znajdziesz informacje o ciasteczkach...</p>
            <Link to="/ciasteczka" className="cookie-link" onClick={handleLinkClick}>Przejdź do ciasteczek</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Cookie;
