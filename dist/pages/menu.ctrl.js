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

var menuCtrl = function($state) {
  var vm = this;
  vm.message = decodeStr("Escolha seu nome");
  vm.submit = function() {
    $state.go('home', {name: vm.name})
  }
}


angular
  .module('app')
  .controller('menuCtrl', menuCtrl);
