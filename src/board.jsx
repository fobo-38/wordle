import React, { use, useState } from 'react';
import { wordList } from './wordList';

export default function Board() {
  const [isHidden, setIsHidden] = useState(true);
  const [cells, setCells] = useState(Array(30).fill(''));
  const [currentCellIndex, setCurrentCellIndex] = useState(0);
  const [targetWord, setTargetWord] = useState('');
  
  
  function start() {
    setIsHidden(false);
    const randWord = wordList[Math.floor(Math.random() * wordList.length)];
    setTargetWord(randWord);
  }

  function addChoice(e) {
    const letter = e.target.textContent;
    if (currentCellIndex < 30) { // Checks to see that inputs are still within the cell range
      const newCells = [...cells];
      newCells[currentCellIndex] = letter;
      setCells(newCells);
      setCurrentCellIndex(currentCellIndex + 1); // Move cursor forward
    }
    console.log(targetWord);
  }

  function clear() {
    if (currentCellIndex > 0) {
      const newCells = [...cells];
      newCells[currentCellIndex - 1] = ''; // Clear previous cell
      setCells(newCells);
      setCurrentCellIndex(currentCellIndex - 1); // Move cursor back
    }
  }

  function enterAnswer() {

  }

  return (
    <div id="board">
      <h1>Wordle</h1>
      {isHidden && <button onClick={start}  id='start-btn'>Start</button>}

      {!isHidden && (
        <>
          <div id='word-board'>
            {cells.map((cell, index) => (
              // Classname is cell. if cell has value, then classname adds 'filled-cell' to name. (cell filled-cell), otherwise, dont add additional names to classname.
              <div key={index} cellIndex={index} className={`cell ${cell ? 'filled-cell' : ''}`}>
                {cell}
              </div>
            ))}
          </div>

          <div id="keyboard-display">
              <div id="row-1">
                  <button onClick={addChoice} className="keyboard-btn">Q</button>
                  <button onClick={addChoice} className="keyboard-btn">W</button>
                  <button onClick={addChoice} className="keyboard-btn">E</button>
                  <button onClick={addChoice} className="keyboard-btn">R</button>
                  <button onClick={addChoice} className="keyboard-btn">T</button>
                  <button onClick={addChoice} className="keyboard-btn">Y</button>
                  <button onClick={addChoice} className="keyboard-btn">U</button>
                  <button onClick={addChoice} className="keyboard-btn">I</button>
                  <button onClick={addChoice} className="keyboard-btn">O</button>
                  <button onClick={addChoice} className="keyboard-btn">P</button>
              </div>
              <div id="row-2">
                  <button onClick={addChoice} className="keyboard-btn">A</button>
                  <button onClick={addChoice} className="keyboard-btn">S</button>
                  <button onClick={addChoice} className="keyboard-btn">D</button>
                  <button onClick={addChoice} className="keyboard-btn">F</button>
                  <button onClick={addChoice} className="keyboard-btn">G</button>
                  <button onClick={addChoice} className="keyboard-btn">H</button>
                  <button onClick={addChoice} className="keyboard-btn">J</button>
                  <button onClick={addChoice} className="keyboard-btn">K</button>
                  <button onClick={addChoice} className="keyboard-btn">L</button>
              </div>
              <div id="row-3">
                  <button onClick={enterAnswer} className="control">ENTER</button>
                  <button onClick={addChoice} className="keyboard-btn">Z</button>
                  <button onClick={addChoice} className="keyboard-btn">X</button>
                  <button onClick={addChoice} className="keyboard-btn">C</button>
                  <button onClick={addChoice} className="keyboard-btn">V</button>
                  <button onClick={addChoice} className="keyboard-btn">B</button>
                  <button onClick={addChoice} className="keyboard-btn">N</button>
                  <button onClick={addChoice} className="keyboard-btn">M</button>
                  <button onClick={clear} className="control"><i className="material-icons">&#xe14a;</i></button>
              </div>
          </div>
        </>
      )}
    </div>
  )
}