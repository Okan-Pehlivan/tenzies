
import React, { useEffect, useState } from "react"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function Box({ value, isHeld, holdDice }) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "aliceblue"
  }

  return(
    <button className="Box" style={styles} onClick={holdDice}>{value}</button>
  );
}

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rollCount, setRollCount] = useState(0)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function NewDie() {
    return {
      value: Math.ceil(Math.random() * 6), 
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(NewDie())
    }
    return newDice
  }

  function rollDice() {
    setRollCount(rollCount + 1)

    if(tenzies) {
      setTenzies(false)
      setRollCount(0)
      setDice(allNewDice())
    } else {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : NewDie()
      }))
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const boxItems = dice.map(die => <Box key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)

  return (
    <div className="App">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <p>(Roll Count: {rollCount})</p>
      <div className="BoxContainer">
        {boxItems}
      </div>
      <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </div>
  );
}

export default App;
