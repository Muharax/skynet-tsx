import React, { useEffect, useState, Suspense } from "react";
import Deck, { createDeck, shuffleDeck } from "./core/Deck";
import Player from "./core/Player";
import Crupier from "./core/Crupier";

const BlackJack = () => {
  const [deck, setDeck] = useState([]);
  const [playerDeck, setPlayerDeck] = useState([]);
  const [crupierDeck, setCrupierDeck] = useState([]);
  const [isStart, setStart] = useState(false);
  const [revealCrupierCard, setRevealCrupierCard] = useState(false);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [crupierPoints, setCrupierPoints] = useState(0);
  const [gameMessage, setGameMessage] = useState("");

  useEffect(() => {
    if (isStart) {
      const newDeck = shuffleDeck(createDeck());
      setDeck(newDeck);
      dealCards(newDeck);
    }
  }, [isStart]);

  useEffect(() => {
    if (isStart) {
      updatePlayerPoints(playerDeck);
    }
  }, [playerDeck]);

  useEffect(() => {
    if (isStart) {
      updateCrupierPoints(crupierDeck, revealCrupierCard);
    }
  }, [crupierDeck, revealCrupierCard]);

  useEffect(() => {
    if (isStart) {
      console.log(`playerPoints - > ${playerPoints}`);
      // setRevealCrupierCard(true);
      if (playerPoints > 21) {
        checkResults(playerPoints, crupierPoints);
      }
    }
  }, [playerPoints]);

  useEffect(() => {
    if (isStart) {
      console.log(`crupierPoints - > ${crupierPoints}`);
      if (crupierPoints === 21 ) {
        setGameMessage();
      }
      //   let newCrupierCards = [...crupierDeck, deck[0]];
      //   setCrupierDeck(newCrupierCards);
      //   let newDeck = deck.slice(1);
      //   setDeck(newDeck);
      //   // checkResults(playerPoints, crupierPoints);
      // } else {
      //   // let newCrupierCards = [...crupierDeck, deck[0]];
      //   // setCrupierDeck(newCrupierCards);
      //   // let newDeck = deck.slice(1);
      //   // setDeck(newDeck);
      //   checkResults(playerPoints, crupierPoints);
      // }
    }
  }, [crupierPoints]);

  const resetGame = () => {
    setStart(false);
    setRevealCrupierCard(false);
    setPlayerDeck([]);
    setCrupierDeck([]);
    setDeck([]);
    setPlayerPoints(0);
    setCrupierPoints(0);
    setGameMessage("");
  };

  function dealCards(deck) {
    let playerCards = [deck[0], deck[2]];
    let crupierCards = [deck[1], deck[3]];
    // if (calculatePoints(crupierCards) === 21) {
    //   setGameMessage("Crupier ma Blackjack!");
      
    // }
    setPlayerDeck(playerCards);
    setCrupierDeck(crupierCards);
    let newDeck = deck.slice(4);
    setDeck(newDeck);
    updatePlayerPoints(playerCards);
  }

  const handleHit = () => {
    if (isStart && playerPoints < 21) {
      let newPlayerCards = [...playerDeck, deck[0]];
      setPlayerDeck(newPlayerCards);
      let newDeck = deck.slice(1);
      setDeck(newDeck);
    }
  };

  const handleStand = () => {
    if (isStart) {
      setRevealCrupierCard(true);
  
      setTimeout(() => {
        // Początkowo używamy wartości zmiennych, które można modyfikować
        let crupierPointsCopy = crupierPoints;
        let newCrupierDeck = [...crupierDeck];
  
        // Pętla while dla rysowania kart krupiera
        while (crupierPointsCopy < 17) {
          newCrupierDeck = [...newCrupierDeck, deck[0]]; // Dodaj nową kartę do talii krupiera
          setCrupierDeck(newCrupierDeck); // Uaktualnij talie krupiera
          setDeck(deck.slice(1)); // Usuń kartę z głównej talii
  
          crupierPointsCopy = calculatePoints(newCrupierDeck); // Oblicz nową sumę punktów krupiera
        }
  
        // Ustaw nową sumę punktów krupiera
        setCrupierPoints(crupierPointsCopy);
  
        // Po zakończeniu pętli, sprawdź wynik
        checkResults(playerPoints, crupierPointsCopy);
      }, 0);
    }
  };
  
  

  const updatePlayerPoints = (cards) => {
    let points = calculatePoints(cards);
    setPlayerPoints(points);
  };
  const calculatePoints = (cards) => {
    let points = 0;
    let numAces = 0;

    cards.forEach((card) => {
      if (card.value === "ACE") {
        numAces++;
        points += 11;
      } else if (["KING", "QUEEN", "JACK"].includes(card.value)) {
        points += 10;
      } else {
        points += parseInt(card.value);
      }
    });

    while (numAces > 0 && points > 21) {
      points -= 10;
      numAces--;
    }

    return points;
  };
  const updateCrupierPoints = (cards, revealCard) => {
    let points = calculatePoints(revealCard ? cards : cards.slice(0, -1));
    setCrupierPoints(points);
  };

  const checkResults = (playerPoints, crupierPoints) => {
    let resultMessage = "";

    switch (true) {
      case playerPoints > 21:
        resultMessage = "Gracz przegrał ma więcej niż 21 punktów!";
        break;
      case playerPoints <= 21 &&
        (crupierPoints > 21 ||
          (crupierPoints <= 21 && playerPoints > crupierPoints)):
        resultMessage = "Gracz wygrywa!";
        break;
      case crupierPoints > 21:
        resultMessage = "Crupier przekroczył 21 punktów.";
        break;
      case playerPoints === 21 && crupierPoints === 21:
        resultMessage = "DOUBLE BLACKJACK";
        break;
      case playerPoints === 21:
        resultMessage = "Gracz wygrywa! Blackjack!";
        break;
      case crupierPoints === 21:
        resultMessage = "Crupier wygrywa! Blackjack!";
        break;
      case playerPoints > crupierPoints &&
        playerPoints < 21 &&
        crupierPoints < 21:
        resultMessage = "Gracz wygrywa!";
        break;
      case playerPoints < crupierPoints:
        resultMessage = "Crupier wygrywa!";
        break;
      case playerPoints === crupierPoints:
        resultMessage = "REMIS";
        break;
      default:
        break;
    }

    setGameMessage(resultMessage);
  };

  const Start = () => {
    setStart(true);
    setGameMessage("");
  };

  return (
    <>
      <div>
        <button onClick={Start}>START</button>
        <button onClick={resetGame}>RESTART</button>
      </div>

      {gameMessage && <div>{gameMessage}</div>}

      {isStart && (
        <>
          <Player cards={playerDeck} points={playerPoints} />
          <div>
            <button onClick={handleHit} disabled={playerPoints >= 21}>
              Hit
            </button>
            <button
              onClick={handleStand}
              // disabled={playerPoints >= 21}
            >
              Stand
            </button>
          </div>
          <Crupier
            cards={crupierDeck}
            points={crupierPoints}
            revealCard={revealCrupierCard}
          />
          <Deck cards={deck} />
        </>
      )}
    </>
  );
};

export default BlackJack;
