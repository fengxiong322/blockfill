import React from 'react';
import Board from './Board.js'
import Timer from './Timer.js'
import Result from './Result.js'
import IntroOverlay from './IntroOverlay.js'
import { STAGE } from '../consts/constants'
import { GameContext } from "../context/GameContext.js"
import io from 'socket.io-client';
import GameState from '../logic/gamestate.js'

const socket = io();

function Game() {
  const context = React.useContext(GameContext);

  React.useEffect(() => {
    if (context.stage === STAGE.TIMED.intro) {
    } else if (context.stage === STAGE.TIMED.overlay) {
      context.nextStage();
    } else if (context.stage == STAGE.TIMED.start){
      context.setGame(new GameState(context.size))
      socket.emit("requestObstacles", context.size);
    } else if (context.stage == STAGE.TIMED.repeat){
      context.nextStage();
    }
  }, [context.stage]);


  const setElements = () => {
    if (context.stage === STAGE.TIMED.intro) {
      return <IntroOverlay />
    } else if (context.stage === STAGE.TIMED.overlay) {
    } else if (context.stage === STAGE.TIMED.start) {
      return <><Board /><Timer /></>
    } else if (context.stage === STAGE.TIMED.end){
      return <Result/>
    }
  }

  return (
    <div className="game">
      {setElements()}
    </div>
  );
}

export default Game;
