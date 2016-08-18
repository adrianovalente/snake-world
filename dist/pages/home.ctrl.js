var homeCtrl = function ($interval) {
  var vm = this;
  vm.score = decodeScore(000);
  var score = 0;

  $interval(function () {
    score++;
    vm.score = decodeScore(score);
  }, 1000);

  function decodeScore(decode) {
    var score = [];
    var temp = decode;
    for (var i = 1; i <= decode.toString().length; i++) {
      score.push(temp%10);
      temp = (temp - temp%10)/10;
    }
    return score;
  }

}

angular
  .module('app')
  .controller('homeCtrl', homeCtrl);
