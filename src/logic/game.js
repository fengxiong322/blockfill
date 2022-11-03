import { BLOCK_TYPE, STAGE } from './../consts/constants.js'
import _ from 'lodash'

class Game {
    constructor(size){
        this.width = size.width;
        this.height = size.height;
        this.selected = [];
        this.board = []
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

    //Stage 1

    addSelected(i){
        this.selected.push(i);
    }

    playCell(i){
        let curCell = this.board[i];
        if(curCell.type === BLOCK_TYPE.empty){
            let head = this.board[this.selected.at(-1)];
            if ((head === undefined) ||
                ((head.x === curCell.x+1 || head.x == curCell.x-1) && (head.y === curCell.y)) ||
                ((head.y === curCell.y+1 || head.y == curCell.y-1) && (head.x === curCell.x))){
                
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

    setObstacle(i){
        this.board[i].type = BLOCK_TYPE.block;
    }

    update(i, stage){
        if(stage === STAGE.play){
            this.playCell(i);
        }else if(stage === STAGE.obstacle){
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
}

export default Game;