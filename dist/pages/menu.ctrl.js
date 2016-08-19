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

var menuCtrl = function() {
  var vm = this;
  vm.message = decodeStr("Escolha seu nome");
  vm.submit = function() {
    alert('oi');
  }
}


angular
  .module('app')
  .controller('menuCtrl', menuCtrl);
