import "./styles.css";
import React from "react";
import Die from "./Die.js";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { Random } from "react-animated-text";

export default function App() {
  const rand = () => {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      });
    }
    return newDice;
  };

  const [DieNum, setDieNum] = React.useState(rand());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(
    function refresh() {
      const allHeld = DieNum.every((die) => die.isHeld);
      const first = DieNum[0].value;
      const sameValue = DieNum.every((die) => die.value === first);
      if (allHeld && sameValue) {
        setTenzies(true);
      }
    },
    [DieNum]
  );

  const diceElement = DieNum.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      held={die.isHeld}
      dieHeld={() => dieHeld(die.id)}
    />
  ));
  function rollDice() {
    if (!tenzies) {
      setDieNum((prevDie) => {
        return prevDie.map((die) => {
          return die.isHeld
            ? die
            : {
                ...die,
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
              };
        });
      });
    } else {
      setTenzies(false);
      setDieNum(rand());
    }
  }

  function dieHeld(id) {
    setDieNum((prevDie) =>
      prevDie.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  return (
    <main className="app">
      {tenzies && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className="heading">
        <Random
          text="TENZIES"
          effect="jump"
          effectChange={4.0}
          effectDuration={7.0}
        />
      </div>

      <p>
        {" "}
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls{" "}
      </p>

      <div className="die-row">{diceElement}</div>
      <button className="rolldice-btn" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll Dice"}
      </button>
    </main>
  );
}
