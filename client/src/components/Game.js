import React from 'react';
import Board from './Board.js'
import Timer from './Timer.js'
import Result from './Result.js'
import IntroOverlay from './IntroOverlay.js'
import { STAGE } from '../consts/constants'
import { GameContext } from "../context/GameContext.js"

function Game() {
  const context = React.useContext(GameContext);

  React.useEffect(() => {
    if (context.stage === STAGE.TIMED.intro) {
      context.setSize({ width: 6, height: 6 });
    } else if (context.stage === STAGE.TIMED.overlay) {
      context.nextStage();
    } else if (context.stage == STAGE.TIMED.start){
      context.game.setFullPath(25);
    } else if (context.stage == STAGE.TIMED.repeat){
      context.nextStage();
    }
  }, [context.stage]);


  const setElements = () => {
    if (context.stage === STAGE.TIMED.intro) {
      return <IntroOverlay />
    } else if (context.stage === STAGE.TIMED.overlay) {
    } else if (context.stage === STAGE.TIMED.start) {
      return <><Timer /><Board /></>
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
