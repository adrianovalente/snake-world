var modalCtrl = function ($uibModalInstance) {
  var vm = this;
  vm.sendNome = function () {
    console.log('my name', vm.nome);
    $uibModalInstance.close(vm.nome);
  }
  
}

angular
  .module('app')
  .controller('modalCtrl', modalCtrl);
