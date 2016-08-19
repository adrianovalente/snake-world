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

var menuCtrl = function($state, $scope) {

  var vm = this;
  vm.name = ''

  window.addEventListener('keydown', function(e) {

    if (e.keyCode === 65) vm.name += 'A'
    if (e.keyCode === 66) vm.name += 'B'
    if (e.keyCode === 67) vm.name += 'C'
    if (e.keyCode === 68) vm.name += 'D'
    if (e.keyCode === 69) vm.name += 'E'
    if (e.keyCode === 70) vm.name += 'F'
    if (e.keyCode === 71) vm.name += 'G'
    if (e.keyCode === 72) vm.name += 'H'
    if (e.keyCode === 73) vm.name += 'I'
    if (e.keyCode === 74) vm.name += 'J'
    if (e.keyCode === 75) vm.name += 'K'
    if (e.keyCode === 76) vm.name += 'L'
    if (e.keyCode === 77) vm.name += 'M'
    if (e.keyCode === 78) vm.name += 'N'
    if (e.keyCode === 79) vm.name += 'O'
    if (e.keyCode === 80) vm.name += 'P'
    if (e.keyCode === 81) vm.name += 'Q'
    if (e.keyCode === 82) vm.name += 'R'
    if (e.keyCode === 83) vm.name += 'S'
    if (e.keyCode === 84) vm.name += 'T'
    if (e.keyCode === 85) vm.name += 'U'
    if (e.keyCode === 86) vm.name += 'V'
    if (e.keyCode === 87) vm.name += 'W'
    if (e.keyCode === 88) vm.name += 'X'
    if (e.keyCode === 89) vm.name += 'Y'
    if (e.keyCode === 90) vm.name += 'Z'
    if (e.keyCode === 8)  vm.name = vm.name.replace(/.$/, '')
    if (e.keyCode === 13) vm.submit()

    $scope.$apply()

  });


  vm.message = decodeStr("Escolha seu nome");
  vm.submit = function() {
    $state.go('home', {name: vm.name})
  }
}


angular
  .module('app')
  .controller('menuCtrl', menuCtrl);
