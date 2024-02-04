// W React (komponent funkcyjny)
import React, { useState } from 'react';

const Test = () => {
  const [myArray, setMyArray] = useState([1, 2, 3, 4, 5]);

  const handlePop = () => {
    // Klonujemy tablicę, aby nie modyfikować oryginalnej bezpośrednio
    const newArray = [...myArray];
    
    // Używamy .pop() do usunięcia ostatniego elementu
    newArray.pop();

    // Ustawiamy nową tablicę za pomocą setMyArray
    setMyArray(newArray);
  };

  return (
    <div>
      <p>Tablica: {myArray.join(', ')}</p>
      <button onClick={handlePop}>Usuń ostatni element</button>
    </div>
  );
};

export default Test;
