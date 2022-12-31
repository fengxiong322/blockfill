import { BLOCK_TYPE, STAGE, DIRECTION } from '../consts/constants.js'
import _ from 'lodash'

class Game {
    constructor(size){
        this.width = size.width;
        this.height = size.height;
        this.selected = [];
        this.board = [];
        this.mouseDown = false;
        this.timer = 0;
        let index = 0;
        for (let i = 0; i < this.width; ++i) {
            for (let j = 0; j < this.height; ++j) {
                this.board.push({
                    i: index,
                    x: i,
                    y: j,
                    type:BLOCK_TYPE.empty});
                index++;
            }   
        }
    }

    updateBoard(){
        document.dispatchEvent(new CustomEvent("UPDATE_CELLS"));
    }

    //Cell File
    getCellType(i){
        return this.board[i].type;
    }

    //Stage 0
    addSelected(i){
        this.selected.push(i);
    }

    //Setting Obstacles
    setObstacle(i){
        if(this.mouseDown){
            this.updateBoard();
            this.board[i].type = BLOCK_TYPE.block;
        }
    }

    setRandomObstacles(numObstacles){
        const obstacles = _.shuffle(_.range(this.width*this.height)).slice(0, numObstacles+1);
        for(let i in obstacles.slice(0, numObstacles)){
            this.board[obstacles[i]].type = BLOCK_TYPE.block;
        }
        this.board[obstacles[numObstacles]].type = BLOCK_TYPE.filled;
        this.addSelected(obstacles[numObstacles]);
        this.updateBoard();
    }

    playCell(i){
        if(this.mouseDown){
            this.updateBoard();
            let curCell = this.board[i];
            if(curCell.type === BLOCK_TYPE.empty){
                let head = this.board[this.selected.at(-1)];
                if ((head === undefined) ||
                    ((head.x === curCell.x+1 || head.x === curCell.x-1) && (head.y === curCell.y)) ||
                    ((head.y === curCell.y+1 || head.y === curCell.y-1) && (head.x === curCell.x))){
                    
                    curCell.type = BLOCK_TYPE.filled;
                    this.addSelected(i);
                }
            }else if(this.board[i].type === BLOCK_TYPE.filled){
                let splitIndex = this.selected.indexOf(i);
                _.range(splitIndex+1, this.selected.length).map(val => {
                    this.board[this.selected[val]].type = BLOCK_TYPE.empty;
                });
                this.selected = this.selected.splice(0, splitIndex+1);

            }
        }
    }



    update(i, stage){
        if(stage === STAGE.TIMED.play){
            this.playCell(i);
        }else if(stage === STAGE.TIMED.obstacle){
            this.setObstacle(i);
        }
    }

    getCell(i){
        return this.board[i];
    }

    getScore(){
        return this.selected.length;
    }

    getBoard(){
        return this.board;
    }

    clear(){
        this.selected.map(cur => {
            this.board[cur].type = BLOCK_TYPE.empty;
        });
        this.selected = []
    }

    reset(){
        this.board.map(cur => {
            cur.type = BLOCK_TYPE.empty;
        });
    }

    getDirection(index1, index2){
        if(index1 === undefined || index2 === undefined){
            return DIRECTION.NONE;
        }
        let cell1 = this.board[index1];
        let cell2 = this.board[index2];
        if(cell1.x === cell2.x){
            if(cell1.y+1 === cell2.y){
                return DIRECTION.UP;
            }else{
                return DIRECTION.DOWN;
            }
        }else {
            if(cell1.x+1 === cell2.x){
                return DIRECTION.RIGHT;
            }else{
                return DIRECTION.LEFT;
            }
        }
    }

    getAdjacent(i){
        let pos = this.selected.indexOf(i);
        return [this.getDirection(this.selected[pos], this.selected[pos-1]),
                this.getDirection(this.selected[pos], this.selected[pos+1])]
    }

    setFullPath(length) {
        const visited = new Array(this.width * this.height).fill(-1);
        this.setFullPathRecursive(length, {x: 0, y: 0}, visited);
        this.board[0].type = BLOCK_TYPE.filled;
        this.addSelected(0);
        this.updateBoard();
    }

    setFullPathRecursive(length, current, [...visited]){
        if (current.x < 0 || current.x >= this.width || current.y < 0 || current.y >= this.height)
            return false;
        if(visited[current.x * this.width + current.y] !== -1)
            return false;
        visited[current.x * this.width + current.y] = length;
        const newlength = length - 1;
        if(newlength === 0){//found our path.
            for(var i = 0; i < visited.length; i++){
                if(-1 === visited[i]){
                    this.board[i].type = BLOCK_TYPE.block;
                }
            }
            return true;
        }else{
            const directions = _.shuffle([{x: current.x+1, y: current.y},
                                          {x: current.x-1, y: current.y},
                                          {x: current.x, y: current.y+1},
                                          {x: current.x, y: current.y-1}]);
            for(var i = 0; i < directions.length; i++){
                if(this.setFullPathRecursive(length-1, directions[i], visited)){
                    return true;
                }
            }
            return false;
        }
    }
}

export default Game;
