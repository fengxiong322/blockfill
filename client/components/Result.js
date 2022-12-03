import React from 'react';
import './Result.css';
import { GameContext } from "../context/GameContext.js"

function Result() {
    const context = React.useContext(GameContext);
      
    return (
        <div className = "results">
            <h1>Results</h1>
            <div>Time Taken: {context.game.timer}</div>
            <button onClick={context.nextStage}>Continue</button>
        </div>
    );
}

export default Result;
