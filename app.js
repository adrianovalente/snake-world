var app = require('express')();
var http = require('http').Server(app);
var uuid = require('node-uuid');
var io = require('socket.io')(http);
var port = process.env.PORT|| 3000;
var players = require('./playersController');
var Player = require('./player')

app.get('/', function(req, res){
  res.sendFile(require('path').join(__dirname, '/index.html'));
});

http.listen(port, function(){
  console.log('listening on port ' + port);
});


io.on('connection', function(socket){

  var id = uuid.v4();
  console.log('a player connected: ' + id);
  socket.emit('hello', id);

  socket.on('hello', function(data) {
    data = JSON.parse(data);
    players.attach(new Player(data.id, data.name, socket));
  });

  /**
  init_snake();
  init_food();
  direction = Direction.RIGHT;
  score = 0;
  interval = setInterval(function () {
    update_snake();
  }, 60);

  socket.on('direction', function(dir) {
    console.log(dir)
    dir = JSON.parse(dir);
    direction = dir.dir;
  });
   */
});


/** aux functions */

var scenario = { height: 40, width: 40 };
var interval, food, direction, snake, score;

var Direction = {
  RIGHT: 0, LEFT: 1,
  UP: 2, DOWN: 3
};

function init_snake() {
  snake = [];
  for (var i = 0; i < 5; i++) {
    snake.push({ x: i, y:0 })
  }
}

function init_food() {
  food = {
    x: Math.floor(Math.random() * scenario.width),
    y: Math.floor(Math.random() * scenario.height)
  }
}

function update_snake() {
  var snake_head = snake[snake.length - 1];

  var new_head = { x: snake_head.x, y: snake_head.y}

  if (direction === Direction.RIGHT)  new_head.x ++;
  if (direction === Direction.LEFT) new_head.x --;
  if (direction === Direction.UP) new_head.y --;
  if (direction === Direction.DOWN) new_head.y ++;

  snake.push(new_head);

  if(new_head.x == food.x && new_head.y == food.y) {

    score++;
    io.emit('score', JSON.stringify({
      score: score
    }));
    init_food();

  } else {
    snake.shift();
  }

  if (should_die()) {
    clearInterval(interval);
    io.emit('lost', JSON.stringify({
      score: score
    }));
  } else {
    io.emit('update', JSON.stringify({
      snake: snake, food: food
    }));
  }



}

function should_die() {
  var snake_head = snake[snake.length - 1];
  if (snake_head.x < 0 || snake_head.x > scenario.width) return true;
  if (snake_head.y < 0 || snake_head.y > scenario.height) return true;

  for (var i = 0; i < snake.length - 1; i++) {
    var pixel = snake[i];
    if (pixel.x == snake_head.x && pixel.y == snake_head.y) return true;
  }
}