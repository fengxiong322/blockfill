//Returns an array, where false represents an obstacle.
export function generatePath(length, width, height) {
    const visited = new Array(width * height).fill(false);
    return generatePathRecursive(length, width, height, {x: 0, y: 0}, visited);
}

function generatePathRecursive(length, width, height, current, [...visited]){
    if (current.x < 0 || current.x >= width || current.y < 0 || current.y >= height)
        return false;
    if(visited[current.x * width + current.y] !== false)
        return false;
    visited[current.x * width + current.y] = true;
    const newlength = length - 1;
    if(newlength === 0){
        return visited;
    }else{
        const directions = _.shuffle([{x: current.x+1, y: current.y},
                                      {x: current.x-1, y: current.y},
                                      {x: current.x, y: current.y+1},
                                      {x: current.x, y: current.y-1}]);
        for(var i = 0; i < directions.length; i++){
            const result = generatePathRecursive(length-1, directions[i], visited);
            if(result){
                return result;
            }
        }
        return false;
    }
}
