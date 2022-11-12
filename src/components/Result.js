import React from 'react';
import { GameContext } from "../context/GameContext.js"

function Result() {
    const context = React.useContext(GameContext);
      
    return (
        <div className = "results">
            {context.game.timer}
        </div>
    );
}

export default Result;
