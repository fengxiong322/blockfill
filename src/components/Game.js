import React from 'react';
import Board from './Board.js'
import Timer from './Timer.js'
import Result from './Result.js'
import IntroOverlay from './IntroOverlay.js'
import { STAGE } from './../consts/constants'
import { GameContext } from "../context/GameContext.js"

function Game() {
  const context = React.useContext(GameContext);

  React.useEffect(() => {
    console.log("update");
    console.log(context.stage)
    if (context.stage === STAGE.TIMED.intro) {
      context.setSize({ width: 5, height: 5 });
    } else if (context.stage === STAGE.TIMED.overlay) {
      context.nextStage();
    } else if (context.stage == STAGE.TIMED.start){
      context.game.setRandomObstacles(10);
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
