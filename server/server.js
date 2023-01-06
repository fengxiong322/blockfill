const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const _ = require("lodash");


const path = require('path');

app.use(express.static(path.join(__dirname, "..", "client/build")));
app.use(express.static(path.join(__dirname, "..", "client/public")));

io.on("connection", (socket) => {
  socket.join("room1");
  socket.on("requestObstacles", (size) => {
    const obstacles  = generatePath(Math.floor(size.width* size.height / 2), size.width, size.height);
    socket.broadcast.emit("sendObstacles", obstacles);
  })
});

server.listen(3000, () => {
  console.log(`Server listening on 3000`);
});

function generatePath(length, width, height) {
  const visited = new Array(width * height).fill(false);
  return generatePathRecursive(length, width, height, {x: 0, y: 0}, [...visited]);
}

function generatePathRecursive(length, width, height, current, visited){
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
          const result = generatePathRecursive(length-1, width, height, directions[i], [...visited]);
          if(result){
              return result;
          }
      }
      return false;
  }
}
