import React from 'react';
import './Result.css';
import { GameContext } from "../context/GameContext.js"

function Result() {
    const context = React.useContext(GameContext);

    function displayTime () {
        const milliseconds = context.game.timer%1000;
        const seconds = Math.floor((context.game.timer%60000)/1000)
        const minutes = Math.floor((context.game.timer%3600000)/60000)
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`
    }
      
    return (
        <div className = "results">
            <h1>Results</h1>
            <div>Time Taken: {displayTime()}</div>
            <button onClick={context.nextStage}>Continue</button>
        </div>
    );
}

export default Result;
