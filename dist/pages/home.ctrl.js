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

var homeCtrl = function ($interval, $uibModal) {
  var vm = this;
  var socket = io();
  vm.score = decodeScore(0);
  vm.user  = decodeStr('Usuario');

  vm.message  = decodeStr('Searching for opponent');

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
      vm.loading = true;
      vm.user = decodeStr(name);
      socket.emit('hello', JSON.stringify({ name: name, id: id }))

    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });


  });

  socket.on('update', function(positions) {
    console.log('update!', positions);

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
    alert('you lost! score: ' + data.score);
    //window.location.reload();

  });

  socket.on('win', function(data) {

    data = JSON.parse(data);
    alert('you WIN!!!!! score: ' + data.score);
    //window.location.reload();

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
