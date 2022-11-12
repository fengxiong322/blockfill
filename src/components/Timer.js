import React from 'react';
import { GameContext } from "../context/GameContext.js"

function Timer() {
    const context = React.useContext(GameContext);
    const [time, setTime] = React.useState("");
    const [startTime, setStartTime] = React.useState("");

    React.useEffect(() => {
        setStartTime(Date.now());
    }, []);

    React.useEffect(() => {
        context.game.timer = time;
    }, [time]);

    React.useEffect(() => {
        clearInterval(myVar);
    }, [context.stage]);

    const myVar = setInterval(() => {
        setTime(Date.now() - startTime);
    }, 100);
      
    return (
        <div className = "timer">
            {time}
        </div>
    );
}

export default Timer;
