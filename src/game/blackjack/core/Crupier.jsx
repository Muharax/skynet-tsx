// Crupier.js
import React from "react";
import EMPTY from '../img/empty-card.png';

const Crupier = ({ cards, points, revealCard }) => (
  <div>
    <h2>Curpier Cards ({points} points):</h2>
    <div className="flex">
      {cards.map((card, index) => (
        <div key={index}>
          <img
            style={{ width: "70px" }}
            src={index === cards.length - 1 && !revealCard ? EMPTY : card.image}
            alt={index === cards.length - 1 && !revealCard ? 'Hidden Card' : `${card.value} of ${card.suit}`}
          />
        </div>
      ))}
    </div>
  </div>
);

export default Crupier;
