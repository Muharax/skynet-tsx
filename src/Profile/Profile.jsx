import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from '../AuthContext/AuthContext';
import './Profile.css';  // Importowanie pliku stylu

function Profile() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!isLoggedIn || !token) {
          throw new Error("Użytkownik niezalogowany lub brak tokenu");
        }

        const response = await fetch(`http://localhost:3001/profile/${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isLoggedIn, username]); // Zaktualizuj tylko w przypadku zmiany isLoggedIn lub username

  if (loading) {
    return <p>Ładowanie profilu...</p>;
  }

  return (
    <div className="profile-container"> {/* Dodanie klasy dla kontenera */}
      <h1>Profil użytkownika {username}</h1>

      {userData ? (
        <div className="profile-info"> {/* Dodanie klasy dla sekcji informacji */}
          <h2>Informacje o profilu:</h2>
          <p>ID: {userData.id}</p>
          <p>Nazwa użytkownika: {userData.user}</p>
          <p>Rola: {userData.role}</p>
          <p>Data logowania: {userData.dataLogowania}</p>
          <p>Ilość logowań: {userData.iloscLogowan}</p>
        </div>
      ) : (
        <p>Brak danych o profilu.</p>
      )}
    </div>
  );
}

export default Profile;
