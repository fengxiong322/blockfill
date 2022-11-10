import React from 'react';
import './Cell.css';
import { GameContext } from "../context/GameContext.js"

function CellPlay(props) {
  const context = React.useContext(GameContext);

  function mouseEnter(e){
    e.preventDefault();
    context.game.playCell(props.id);
  }

  function mouseDown(e){
    e.preventDefault();
    context.game.mouseDown = true;
    context.game.playCell(props.id);
  }

  function mouseUp(e){
    e.preventDefault();
    context.game.mouseDown = false;
  }

  return (
    <div className={"Cell " + context.game.getCellType(props.id)}
    onMouseEnter={mouseEnter} onMouseDown={mouseDown} onMouseUp={mouseUp}>
    </div>
  );
}

export default CellPlay;
