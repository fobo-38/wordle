import React, { use, useEffect, useState } from 'react';
import { wordList } from './wordList';

export default function Board() {
  const [isHidden, setIsHidden] = useState(true);
  const [cells, setCells] = useState(Array(30).fill(''));
  const [currentCellIndex, setCurrentCellIndex] = useState(0);
  const [targetWord, setTargetWord] = useState('');
  const [currentRow, setCurrentRow] = useState(0);
  const [cellColors, setCellColors] = useState(Array(30).fill(''));
  const [keyboardColors, setKeyboardColors] = useState({});
  const [gameStatus, setGameStatus] = useState('playing'); //playing, won, lost
  const [message, setMessage] = useState('');

  const ROW_LENGTH = 5;
  const MAX_ATTEMPTS = 6;
  
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Only process keys when game is playing and board is visible
      if (gameStatus != 'playing' || isHidden) {
        return;
      }
      const key = event.key.toUpperCase();

      // Handle letter keys (A-Z)
      if (key.match(/^[A-Z]$/) && key.length === 1) {
        const fakeEvent = {
          target: { textContent: key }
        };
        addChoice(fakeEvent);
      }
      else if (event.key === 'Enter') {
        enterAnswer();
      }
      else if (event.key === 'Backspace') {
        clear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameStatus, isHidden, currentCellIndex, currentRow, targetWord, cells, cellColors, keyboardColors]);

  function start() {
    const randWord = wordList[Math.floor(Math.random() * wordList.length)];
    setTargetWord(randWord.toUpperCase());
    setIsHidden(false);
    setCells(Array(30).fill(''));
    setCurrentCellIndex(0);
    setCurrentRow(0);
    setCellColors(Array(30).fill(''));
    setKeyboardColors({});
    setGameStatus('playing');
    setMessage('');
  }

  function addChoice(e) {
    if (gameStatus != 'playing') {
      return;
    }

    const letter = e.target.textContent;

    // Only add if at the end of the current row
    if (currentCellIndex < (currentRow + 1) * ROW_LENGTH && currentCellIndex < 30) {
      const newCells = [...cells];
      newCells[currentCellIndex] = letter;
      setCells(newCells);
      setCurrentCellIndex(currentCellIndex + 1); // Move cursor forward
    }
  }

  function clear() {
    if (gameStatus != 'playing') {
      return;
    }

    // Only clear if not at the beginning of the current row
    if (currentCellIndex > currentRow * ROW_LENGTH) {
      const newCells = [...cells];
      newCells[currentCellIndex - 1] = ''; // Clear previous cell
      setCells(newCells);
      setCurrentCellIndex(currentCellIndex - 1); // Move cursor back
    }
  }

  function enterAnswer() {
    if (gameStatus != 'playing') {
      return;
    }

    const rowStart = currentRow * ROW_LENGTH;
    const rowEnd = rowStart + ROW_LENGTH;

    // Check if current row is complete
    const currentRowCells = cells.slice(rowStart, rowEnd);
    if (currentRowCells.some(cell => cell === '')) {
      setMessage('Not enough letters');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    const guess = currentRowCells.join('');

    // Check if guess is a valid word
    if (!wordList.includes(guess.toLowerCase())) {
      setMessage('Not in Word list');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    // Calculate colors for guess
    const newCellColors = [...cellColors];
    const newKeyboardColors = {...keyboardColors};
    const targetLetters = targetWord.split('');
    const guessLetters = guess.split('');

    // First pass: mark exact matches (green)
    const used = Array(ROW_LENGTH).fill(false);
    const targetUsed = Array(ROW_LENGTH).fill(false);

    for (let i = 0; i < ROW_LENGTH; i++) {
      const cellIndex = rowStart + i;
      const letter = guessLetters[i];

      if (letter === targetLetters[i]) {
        newCellColors[cellIndex] = 'correct'; // Green
        newKeyboardColors[letter] = 'correct';
        used[i] = true;
        targetUsed[i] = true;
      }
    }

    // Second pass: mark wrok position (yellow) & wrong (gray)
    for (let i = 0; i < ROW_LENGTH; i++) {
      if (used[i]) continue; // Marked as 'correct' already

      const cellIndex = rowStart + i;
      const letter = guessLetters[i];
      let found = false;

      // Look for this letter in unsed positions of target
      for (let j = 0; j < ROW_LENGTH; j++) {
        if (!targetUsed[j] && targetLetters[j] === letter) {
          newCellColors[cellIndex] = 'present'; // Yellow

          // Only set if keyboard color is not already 'correct'
          if (newKeyboardColors[letter] != 'correct') {
            newKeyboardColors[letter] = 'present';
          }
          targetUsed[j] = true;
          found = true;
          break;
        }
      }

      if (!found) {
        newCellColors[cellIndex] = 'absent'; // Gray

        // Only set to 'absent' if not already marked as 'present' / 'correct'
        if (!newKeyboardColors[letter]) {
          newKeyboardColors[letter] = 'absent';
        }
      }
    }

    setCellColors(newCellColors);
    setKeyboardColors(newKeyboardColors);

    // Check win condition
    if (guess === targetWord) {
      setGameStatus('won');
      setMessage('Congratulations! You Won!');
      return;
    }

    // Move to next row
    const nextRow = currentRow + 1;
    setCurrentRow(nextRow);
    setCurrentCellIndex(nextRow * ROW_LENGTH);

    // Check lose condition
    if (nextRow >= MAX_ATTEMPTS) {
      setGameStatus('lost');
      setMessage(`Game Over! The word was ${targetWord}`);
    }
  }

  function resetGame() {
    const randWord = wordList[Math.floor(Math.random() * wordList.length)];
    setTargetWord(randWord.toUpperCase());
    setCells(Array(30).fill(''));
    setCurrentCellIndex(0);
    setCurrentRow(0);
    setCellColors(Array(30).fill(''));
    setKeyboardColors({});
    setGameStatus('playing');
    setMessage('');

    console.log(randWord);
  }

  return (
    <div id="board">
      <h1>Wordle</h1>
      {message && <div className="message">{message}</div>}

      {isHidden && <button onClick={start}  id='start-btn'>Start</button>}

      {!isHidden && (
        <>
          <div id='word-board'>
            {cells.map((cell, index) => {
              const colorClass = cellColors[index] ? cellColors[index] : '';
              return (
              // Classname is cell. if cell has value, then classname adds 'filled-cell' to name. (cell filled-cell), otherwise, dont add additional names to classname.
              <div 
                key={index} 
                cellIndex={index} 
                className={`cell ${cell ? 'filled-cell' : ''} ${cellColors[index] || ''}`}
                >
                {cell}
              </div>
              );
            })}
          </div>

          <div id="keyboard-display">
              <div id="row-1">
                  {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(letter => (
                    <button
                      key={letter}
                      onClick={addChoice}
                      className={`keyboard-btn ${keyboardColors[letter] || ''}`}
                    >
                      {letter}
                    </button>
                  ))}
              </div>
              <div id="row-2">
                  {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(letter => (
                    <button
                      key={letter}
                      onClick={addChoice}
                      className={`keyboard-btn ${keyboardColors[letter] || ''}`}
                    >
                      {letter}
                    </button>
                  ))}
              </div>
              <div id="row-3">
                <button onClick={enterAnswer} className="control">ENTER</button>
                  {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(letter => (
                    <button
                      key={letter}
                      onClick={addChoice}
                      className={`keyboard-btn ${keyboardColors[letter] || ''}`}
                    >
                      {letter}
                    </button>
                  ))}
                  <button onClick={clear} className="control">
                    <i className="material-icons">&#xe14a;</i>
                  </button>
              </div>
          </div>

          {(gameStatus === 'won' || gameStatus === 'lost') && (
            <button onClick={resetGame} className="reset-btn">Play Again?</button>
          )}

        </>
      )}
    </div>
  )
}