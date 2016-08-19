var ControllerStatus = {
  WAITING: 'waiting',
  PLAYING: 'playing',
  IDLE: 'idle',
  COUNTING: 'counting'
}



function decodeScore(decode) {
  var score = [];
  var temp = decode;
  for (var i = 1; i <= decode.toString().length; i++) {
    score.push(temp%10);
    temp = (temp - temp%10)/10;
  }
  return score;
}

function decodeStr(decode) {
  var temp = decode.toUpperCase().split("");
  temp = temp.map(function(char) {
    if(char == " ") {
      return "espaco";
    }
    return char;
  })
  return temp;
}

var homeCtrl = function ($interval, $uibModal, $stateParams, $state, $scope) {
  var vm = this;

  vm.topPlayers = []

  vm.status = ControllerStatus.IDLE;

  var socket = io();

  socket.on('topPlayers', function (data) {
    vm.topPlayers = JSON.parse(data)
    $scope.$apply()
  })

  vm.score = decodeScore(0);
  vm.user = decodeStr($stateParams.name);
  vm.message  = decodeStr('Searching for opponent');
  vm.ready = false;

  vm.startPlaying = function () {
    socket.emit('request');
    vm.status = ControllerStatus.WAITING;

  }

  var scenario = { height: 40, width: 40 };
  var c = document.getElementById('canvas');
  var ctx = c.getContext('2d');
  var food, direction, snake, score, otherPlayer;
  var can_turn = true;
  var size = { x: c.width / scenario.width, y: c.height / scenario.height }

  var Direction = {
    RIGHT: 0, LEFT: 1,
    UP: 2, DOWN: 3
  };

  if (!$stateParams) {
    $state.go('menu');
  }

  socket.on('hello', function (id) {
    vm.ready = true;

    vm.loading = true;
    console.log($stateParams.name);
    socket.emit('hello', JSON.stringify({ name: vm.user, id: id }))

  });

  socket.on('update', function(positions) {
    console.log('update!', positions);
    vm.status = ControllerStatus.PLAYING;

    // ups
    $scope.$apply();

    positions = JSON.parse(positions);

    food = positions.food;
    snake = positions.you;
    otherPlayer = positions.other;
    direction = positions.direction;
    draw();

  });

  socket.on('lost', function(data) {
    console.log('lost!', data)
    data = JSON.parse(data);

    setTimeout(function () {
      vm.status = ControllerStatus.IDLE;
      $scope.$apply();
      alert('you lost! score: ' + data.score);
    }, 500)

  });

  socket.on('prepare', function (data) {

    console.log('OPA')
    data = JSON.parse(data);
    vm.status = ControllerStatus.COUNTING;
    vm.count = data.count;
    vm.adv = data.adv;
    $scope.$apply();
  })

  socket.on('win', function(data) {

    data = JSON.parse(data);

    setTimeout(function () {
      vm.status = ControllerStatus.IDLE;
      $scope.$apply();
      alert('you WIN!!!!! score: ' + data.score);

    }, 500);

  });

  socket.on('score', function(data) {
    console.log('score!', data)
    data = JSON.parse(data);

    score = data.score;
    vm.score = decodeScore(score);


  });



  function changeDirection(dir) {

    socket.emit('direction', JSON.stringify({dir : dir}));
    direction = dir;
  }



  // listening to keyboard events
  window.addEventListener('keydown', function(e) {

    if (!can_turn) return;
    can_turn = false;

    if (e.keyCode === 39) if (direction != Direction.LEFT)  changeDirection(Direction.RIGHT);
    if (e.keyCode === 37) if (direction != Direction.RIGHT) changeDirection(Direction.LEFT);
    if (e.keyCode === 38) if (direction != Direction.DOWN)  changeDirection(Direction.UP);
    if (e.keyCode === 40) if (direction != Direction.UP)    changeDirection(Direction.DOWN);
  });

  function draw() {

    can_turn = true;
    // cleaning the canvas
    ctx.clearRect(0, 0, c.width, c.height);

    ctx.fillStyle = '#FF0000';

    ctx.fillRect(food.x * size.x, food.y * size.y, size.x, size.y)

    for (var i = 0; i < snake.length; i++) {
      var head = snake[i];
      ctx.fillRect(head.x * size.x, head.y * size.y, size.x, size.y)
    }

    ctx.fillStyle = '#00FF00';

    for (i = 0; i < otherPlayer.length; i++) {
      head = otherPlayer[i];
      ctx.fillRect(head.x * size.x, head.y * size.y, size.x, size.y)
    }

  }

}

angular
  .module('app')
  .controller('homeCtrl', homeCtrl);
