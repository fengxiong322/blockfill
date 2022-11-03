import React from 'react';
import './App.css';
import Board from './Board.js'
import { GameContextProvider } from "../context/GameContext.js"

//TODO: Add a State in App to keep track of the stage of the game, to trigger rerenders.

function App() {


  return (
    <div className="App">
      <GameContextProvider>
        <Board />
      </GameContextProvider>
    </div>
  );
}

export default App;
