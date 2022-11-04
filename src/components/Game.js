import React, { useEffect } from 'react';
import Board from './Board.js'
import IntroOverlay from './IntroOverlay.js'
import {STAGE} from './../consts/constants'
import { GameContext } from "../context/GameContext.js"
import { set } from 'lodash';

function Game(){
    const context = React.useContext(GameContext);

    React.useEffect(() => {
        if (context.stage === STAGE.intro){
            console.log("Introduction Phase");
          }else if (context.stage === STAGE.start){
            console.log("Start Game");
            context.setSize({width: 5, height: 5});
          }
    }, [context.stage]);


    const setElements = () => {
        if (context.stage === STAGE.intro){
          return <IntroOverlay/>
        }else if (context.stage === STAGE.start){
            return <Board />
        }
    }

    return (
      <div className="game">
        {setElements()}
      </div>
    );
}

export default Game;
