import React, { useState } from 'react';
import './DiceRoller.css'

function DiceRoller() {
  const [diceNumber, setDiceNumber] = useState(1);

  // Function to roll the dice
  const rollDice = () => {
    const newNumber = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(newNumber);
  };

  return (
    <div className='container'>
      <h1>Dice Roller</h1>
      <div className='diceDisplay'>
        <p className='diceNumber'>{diceNumber}</p>
      </div>
      <button className='button' onClick={rollDice}>
        Roll Dice
      </button>
    </div>
  );
}

export default DiceRoller;
