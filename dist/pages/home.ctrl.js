function decodeScore(decode) {
  var score = [];
  var temp = decode;
  for (var i = 1; i <= decode.toString().length; i++) {
    score.push(temp%10);
    temp = (temp - temp%10)/10;
  }
  return score;
}

var homeCtrl = function ($interval, $uibModal) {
  var vm = this;
  var socket = io();
  vm.score = decodeScore(0);
  var score = 0;
  var scenario = { height: 40, width: 40 };
  var c = document.getElementById('canvas');
  var ctx = c.getContext('2d');
  var interval, food, direction, snake, score;
  var can_turn = true;
  var maxScore = 0;
  var size = { x: c.width / scenario.width, y: c.height / scenario.height }

  $interval(function () {
    score++;
    vm.score = decodeScore(score);
  }, 1000);


  var Direction = {
    RIGHT: 0, LEFT: 1,
    UP: 2, DOWN: 3
  };


  socket.on('hello', function (id) {
    console.log('hello');
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'pages/modal.html',
      controller: 'modalCtrl',
      controllerAs: 'modal',
      size: size,
      resolve: {
        name: function () {
          return vm.name;
        }
      }
    });

    modalInstance.result.then(function (name) {
      vm.name = name;
      socket.emit('hello', JSON.stringify({ name: name, id: id }))
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });


  });

  socket.on('update', function(positions) {

    positions = JSON.parse(positions);
    food = positions.food;
    snake = positions.snake;
    draw();

  });

  socket.on('lost', function(data) {

    data = JSON.parse(data);
    alert('you lost! score: ' + data.score);
    window.location.reload();

  });

  socket.on('score', function(data) {
    data = JSON.parse(data);
    document.getElementById('score-label').textContent = 'Your score: ' + data.score;
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

  }

}

angular
  .module('app')
  .controller('homeCtrl', homeCtrl);
