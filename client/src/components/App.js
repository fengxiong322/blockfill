import React, { useContext } from 'react';
import {STAGE} from './../consts/constants'
import './App.css';
import Game from './Game.js'
import { GameContextProvider } from "../context/GameContext.js"

//TODO: Add a State in App to keep track of the stage of the game, to trigger rerenders.

function App() {

  return (
    <div className="App">
      <GameContextProvider>
        <Game />
      </GameContextProvider>
    </div>
  );
}

export default App;
