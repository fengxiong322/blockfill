import React from 'react';
import Cell from './CellPlay.js'
import { GameContext } from "../context/GameContext.js"
import _ from 'lodash';
import CellPlay from './CellPlay.js';

function Board(props) {
  const context = React.useContext(GameContext);
  const [update, setUpdate] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if(e.key === " "){
        context.nextStage();
      }
    });
  },[]);

  document.addEventListener("UPDATE_CELLS", (e) => {
    setUpdate(!update);
  });

  const boardStyle = {
    display: "inline-grid",
    gridTemplateColumns: "repeat(" + context.size.width + ", 100px)",
    gridTemplateRows: "repeat(" + context.size.height + ", 100px)"
  };

  return (
    <div className="board" style={boardStyle}>
      {context.game && context.game.board.map(cur => {
        return <CellPlay key={cur.i.toString()} id={cur.i}/>
      })}
    </div>
  );
}

export default Board;
