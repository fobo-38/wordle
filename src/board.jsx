import React, { useState } from "react";

export default function Board() {
    function addChoice() {
        
    }

    function clear() {

    }

    function enterAnswer() {

    }


  return (
    <div id="board">
      <h1>Wordle</h1>
        <div id='word-board'>
          <div cellIndex='0' className='cell'></div>
          <div cellIndex='1' className='cell'></div>
          <div cellIndex='2' className='cell'></div>
          <div cellIndex='3' className='cell'></div>
          <div cellIndex='4' className='cell'></div>
          <div cellIndex='5' className='cell'></div>
          <div cellIndex='6' className='cell'></div>
          <div cellIndex='7' className='cell'></div>
          <div cellIndex='8' className='cell'></div>
          <div cellIndex='9' className='cell'></div>
          <div cellIndex='10' className='cell'></div>
          <div cellIndex='11' className='cell'></div>
          <div cellIndex='12' className='cell'></div>
          <div cellIndex='13' className='cell'></div>
          <div cellIndex='14' className='cell'></div>
          <div cellIndex='15' className='cell'></div>
          <div cellIndex='16' className='cell'></div>
          <div cellIndex='17' className='cell'></div>
          <div cellIndex='18' className='cell'></div>
          <div cellIndex='19' className='cell'></div>
          <div cellIndex='20' className='cell'></div>
          <div cellIndex='21' className='cell'></div>
          <div cellIndex='22' className='cell'></div>
          <div cellIndex='23' className='cell'></div>
          <div cellIndex='24' className='cell'></div>
          <div cellIndex='25' className='cell'></div>
          <div cellIndex='26' className='cell'></div>
          <div cellIndex='27' className='cell'></div>
          <div cellIndex='28' className='cell'></div>
          <div cellIndex='29' className='cell'></div>
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
                <button onClick={clear} className="control"><i class="material-icons">&#xe14a;</i></button>
            </div>
        </div>
    </div>
  )
}