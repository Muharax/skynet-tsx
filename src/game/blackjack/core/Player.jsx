// Player.js
import React from "react";
import '../blackJack.css'

const Player = ({ cards, points }) => (
  <div>
    <h2>Player Cards ({points} points):</h2>
    <div className="flex">
      {cards.map((card, index) => (
        <div key={index}>
          <img
            style={{ width: "70px" }}
            src={card.image}
            alt={`${card.value} of ${card.suit}`}
          />
        </div>
      ))}
    </div>
  </div>
);

export default Player;
