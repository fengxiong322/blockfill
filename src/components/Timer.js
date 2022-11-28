import React from 'react';
import { GameContext } from "../context/GameContext.js"

function Timer() {
    const context = React.useContext(GameContext);
    const [time, setTime] = React.useState("");
    const startTime = Date.now();

    React.useEffect(() => {
        const myVar = setInterval(() => {
            setTime(Date.now() - startTime);
        }, 100);
        return () => {
            clearInterval(myVar);
        }
    }, []);

    React.useEffect(() => {
        context.game.timer = time;
    }, [time]);

    return (
        <div className = "timer">
            {time}
        </div>
    );
}

export default Timer;
