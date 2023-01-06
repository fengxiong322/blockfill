import React from 'react';
import { GameContext } from "../context/GameContext.js"

function Timer() {
    const context = React.useContext(GameContext);
    const [time, setTime] = React.useState(0);
    const startTime = Date.now();

    React.useEffect(() => {
        const myVar = setInterval(() => {
            if(context.game !== null)
                setTime(Date.now() - startTime);
        }, 100);
        return () => {
            clearInterval(myVar);
        }
    }, []);

    React.useEffect(() => {
        if(context.game !== null){
            context.game.timer = time;
        }
            
    }, [time]);

    function displayTime () {
        const milliseconds = time%1000;
        const seconds = Math.floor((time%60000)/1000)
        const minutes = Math.floor((time%3600000)/60000)
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`
    }

    return (
        <div className = "timer">
            {displayTime()}
        </div>
    );
}

export default Timer;
