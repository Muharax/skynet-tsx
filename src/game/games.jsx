import React, { useState } from "react";
import BlackJack from "./blackjack/blackJack";
import gameImage from "./blackjack/background-blackjack.jpg";
import "./games.css"; // Importuj plik ze stylami

const Games = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const startGame = (game) => {
    setSelectedGame(game);
  };

  return (
    <>
      <div className="games-title">Games</div>

      {selectedGame ? (
        <BlackJack />
      ) : (
        <div 
          className="cardd"
          onClick={() => startGame("blackjack")}
          >
          <img
            src={gameImage}
            alt="Game Preview"
            className="imagee"
          />
          <div className="descriptionn">
            <div>Black Jack</div>
            <div>Hello Black Jack !</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Games;
