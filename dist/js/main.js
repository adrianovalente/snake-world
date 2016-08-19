angular
  .module('app', ['ui.router', 'ui.bootstrap'])

  .config(function routing($urlRouterProvider, $locationProvider, $stateProvider) {
    console.log('routes loaded!');
    $urlRouterProvider.otherwise('/welcome');

    $stateProvider
      .state('home', {
        url: '/welcome',
        templateUrl: 'pages/home.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'

      });

  });
