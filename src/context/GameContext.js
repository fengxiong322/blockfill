import { useState, createContext, useEffect } from "react";
import Game from './../logic/game.js'
import { STAGE } from './../consts/constants.js'

export const GameContext = createContext({
    size: {width: 0, height: 0},
    game: null
});

export const GameContextProvider = ({children}) => {
    const [size, setSize] = useState({width: 0, height: 0});
    const [game, setGame] = useState(null);

    useEffect(() => {
        console.log("init");
        setGame(new Game(size));
    }, [size]);

    return (
        <GameContext.Provider value = {{
            size, setSize,
            game
        }}>
            {children}
        </GameContext.Provider>
    );
}
