import { useState, createContext, useEffect } from "react";
import GameState from '../logic/gamestate.js'
import { STAGE } from '../consts/constants.js'
import io from 'socket.io-client';

const socket = io();

export const GameContext = createContext({
    size: {width: 6, height: 6},
    game: null,
    stage: STAGE.TIMED.intro
});

export const GameContextProvider = ({children}) => {
    const [size, setSize] = useState({width: 6, height: 6});
    const [game, setGame] = useState(new GameState(size));
    const [stage, setStage] = useState(STAGE.TIMED.intro);

    useEffect(() => {
        socket.on('connect', () => {
            console.log("connected")
        });

        socket.on('sendObstacles', (obstacles) => {
            const newGame = new GameState(size);
            newGame.addObstacles(obstacles)
            setGame(newGame);
        })
    
        return () => {
          socket.off('connect');
          socket.off('sendObstacles');
        };
      }, []);

    useEffect(() => {
        
    }, [size]);

    function nextStage(){
        setStage((stage+1)% STAGE.TIMED.length);
    }

    return (
        <GameContext.Provider value = {{
            size, setSize,
            game, setGame,
            stage, nextStage
        }}>
            {children}
        </GameContext.Provider>
    );
}
