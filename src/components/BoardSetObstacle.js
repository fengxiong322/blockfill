import React from 'react';
import Cell from './Cell.js'
import { GameContext } from "../context/GameContext.js"
import { property } from 'lodash';


// Super Class
function BoardSetObstacle(props) {
    const context = React.useContext(GameContext);

    function mouseEnter(e){
        
    }

    function mouseDown(e){

    }

    function mouseUp(e){
        
    }

    return (
      <Board mouseEnter = {mouseEnter} mouseDown = {mouseDown} mouseUp = {mouseUp}/>
    );
  }
  
export default BoardSetObstacle;
