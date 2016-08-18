var homeCtrl = function () {
  var vm = this;
  vm.score = 0;
}

angular
  .module('app')
  .controller('homeCtrl', homeCtrl);
