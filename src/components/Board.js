import React from 'react';
import Cell from './Cell.js'
import { GameContext } from "../context/GameContext.js"
import { property } from 'lodash';


// Super Class
function Board(props) {
    const context = React.useContext(GameContext);
    return (
      <div className="board">
        {context.game && context.game.board.map(cur => {
          return <Cell key = {cur.i.toString()} id={cur.i.toString()}
           onMouseEnter = {props.mouseEnter} onMouseDown = {props.mouseDown} onMouseUp = {props.mouseUp}></Cell>
        })}
      </div>
    );
  }
  
export default Board;
