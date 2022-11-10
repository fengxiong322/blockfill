import { useState, createContext, useEffect } from "react";
import Game from './../logic/game.js'
import { STAGE } from './../consts/constants.js'

export const GameContext = createContext({
    size: {width: 0, height: 0},
    game: null,
    stage: STAGE.TIMED.intro
});

export const GameContextProvider = ({children}) => {
    const [size, setSize] = useState({width: 0, height: 0});
    const [game, setGame] = useState(null);
    const [stage, setStage] = useState(STAGE.TIMED.intro);

    useEffect(() => {
        setGame(new Game(size));
    }, [size]);

    function nextStage(){
        setStage((stage+1)% STAGE.TIMED.length);
    }

    return (
        <GameContext.Provider value = {{
            size, setSize,
            game,
            stage, nextStage
        }}>
            {children}
        </GameContext.Provider>
    );
}
