import React from 'react';
import Cell from './Cell.js'
import { GameContext } from "../context/GameContext.js"

function Board() {
    const context = useContext(GameContext);
    return (
      <div className="board">
        {context.game && context.game.board.map(cur => {
          return <Cell key = {cur.i.toString()} id={cur.i.toString()}></Cell>
        })}
      </div>
    );
  }
  
export default Board;
