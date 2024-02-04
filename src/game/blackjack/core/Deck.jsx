// Deck.js
import React from "react";
import cards from "../cards";

export const createDeck = () => {
  const deck = [];
  for (let i = 0; i < cards.length; i++) {
    deck.push(cards[i]);
  }
  return shuffleSortDeck(deck);
};

export const shuffleDeck = (deck) => {
  for (let i = 0; i < 1000; i++) {
    let location1 = Math.floor(Math.random() * deck.length);
    let location2 = Math.floor(Math.random() * deck.length);
    let tmp = deck[location1];
    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
  return deck;
};

const shuffleSortDeck = (deck) => {
  return deck.sort(() => Math.random() - 0.5);
};

const Deck = ({ cards }) => (
  <div>
    <h2>Deck Cards</h2>
    <div className="flex wrap">
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

export default Deck;
