const constants = require('./constants');
const scenario = constants.scenario;

var Direction = {
  RIGHT: 0, LEFT: 1,
  UP: 2, DOWN: 3
};

module.exports = function (playerA, playerB) {
  var self = this;

  self.status = constants.GameStatus.RUNNING;

  function init_food() {
    self.food = {
      x: Math.floor(Math.random() * scenario.width),
      y: Math.floor(Math.random() * scenario.height)
    }
  }

  self.playerA = playerA;
  self.playerB = playerB;

  self.toString = function () {
    return self.playerA.name + ' versus ' + self.playerB.name;
  }

  // initing snakes
  self.playerA.snake = [];
  for (var i = 0; i < 5; i++) {
    self.playerA.snake.push({ x: i, y:0 })
  }

  self.playerB.snake = [];
  for (i = 0; i < 5; i++) {
    self.playerB.snake.push({ x: scenario.width - 1 - i, y:0 })
  }

  // initing directions
  self.playerA.direction = Direction.RIGHT;
  self.playerB.direction = Direction.LEFT;

  // initing score
  self.playerA.score = 0;
  self.playerB.score = 0;

  // initing food for the first time
  init_food();


  playerA.socket.on('direction', function(dir) {
    console.log(dir);
    dir = JSON.parse(dir);
    playerA.direction = dir.dir;
  });

  playerB.socket.on('direction', function(dir) {
    console.log(dir);
    dir = JSON.parse(dir);
    playerB.direction = dir.dir;
  });

  self.interval = setInterval(function () {

    // updating snake A
    var snake = playerA.snake;

    var snake_head = snake[snake.length - 1];

    var new_head = { x: snake_head.x, y: snake_head.y}

    if (playerA.direction === Direction.RIGHT)  new_head.x ++;
    if (playerA.direction === Direction.LEFT) new_head.x --;
    if (playerA.direction === Direction.UP) new_head.y --;
    if (playerA.direction === Direction.DOWN) new_head.y ++;

    snake.push(new_head);

    var food = self.food;

    if(new_head.x == food.x && new_head.y == food.y) {

      playerA.score++;
      playerA.socket.emit('score', JSON.stringify({
        score: playerA.score
      }));
      init_food();

    } else {
      snake.shift();
    }

    if (should_die(snake)) {
      clearInterval(self.interval);
      self.status = constants.GameStatus.ENDED;
      playerA.socket.emit('lost', JSON.stringify({
        score: playerA.score
      }));

      playerB.socket.emit('win', JSON.stringify({
        score: playerB.score
      }));

    } else {
      //playerA.emit('update', JSON.stringify({
      //  you: playerA.snake, food: self.food, other: playerB.snake
      //}));
    }



    // updating player B

    snake = playerB.snake;

    snake_head = snake[snake.length - 1];

    new_head = { x: snake_head.x, y: snake_head.y};

    if (playerB.direction === Direction.RIGHT)  new_head.x ++;
    if (playerB.direction === Direction.LEFT) new_head.x --;
    if (playerB.direction === Direction.UP) new_head.y --;
    if (playerB.direction === Direction.DOWN) new_head.y ++;

    snake.push(new_head);

    if(new_head.x == food.x && new_head.y == food.y) {

      playerB.score++;
      playerB.socket.emit('score', JSON.stringify({
        score: playerB.score
      }));
      init_food();

    } else {
      snake.shift();
    }

    // it means that playerB has lost
    if (should_die(snake)) {
      clearInterval(self.interval);
      self.status = constants.GameStatus.ENDED;
      playerB.socket.emit('lost', JSON.stringify({
        score: playerB.score
      }));

      playerA.socket.emit('win', JSON.stringify({
        score: playerA.score
      }));

    } else {
      //playerB.emit('update', JSON.stringify({
      //  you: playerA.snake, food: self.food, other: playerB.snake
      //}));
    }


    // sending feedbacks
    playerA.socket.emit('update', JSON.stringify({
      you: playerA.snake, food: self.food, other: playerB.snake, direction: playerA.direction
    }));

    playerB.socket.emit('update', JSON.stringify({
      you: playerB.snake, food: self.food, other: playerA.snake, direction: playerB.direction
    }));



  }, 400)



};

function should_die(snake, otherSnake) {
  var snake_head = snake[snake.length - 1];
  if (snake_head.x < 0 || snake_head.x > scenario.width) return true;
  if (snake_head.y < 0 || snake_head.y > scenario.height) return true;

  for (var i = 0; i < snake.length - 1; i++) {
    var pixel = snake[i];
    if (pixel.x == snake_head.x && pixel.y == snake_head.y) return true;
  }

  for (i = 0; i < otherSnake.length - 1; i++) {
    pixel = otherSnake[i];
    if (pixel.x == snake_head.x && pixel.y == snake_head.y) return true;
  }

}