import React from 'react';
import { GameContext } from "../context/GameContext.js"

function IntroOverlay() {
    const context = React.useContext(GameContext);

    return (
        <div className="overlay">
            <h1>Welcome to Block Fill!</h1>
            <p><strong>How to play: </strong></p>
            <button onClick={context.nextStage}>Start Game!</button>
        </div>
    );
}

export default IntroOverlay;
