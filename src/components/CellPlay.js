import React from 'react';
import './Cell.css';
import { GameContext } from "../context/GameContext.js"

function CellPlay(props) {
  const context = React.useContext(GameContext);

  const setCellImage = () => {
    if(context.game.getCellType(props.id) === 'filled'){
      let adj = context.game.getAdjacent(props.id);
      adj = adj.map((element)=>{
        return element.map(x =>{return 50 + 50 * x})
      })
      return <path d={'M' + adj[0].toString() + ' Q50,50 ' + adj[1].toString()}></path>;
    }
  }

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
      <svg viewBox='0 0 100 100'>
        {setCellImage()}
      </svg>
    </div>
  );
}

export default CellPlay;
