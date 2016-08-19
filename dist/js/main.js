angular
  .module('app', ['ui.router', 'ui.bootstrap'])

  .config(function routing($urlRouterProvider, $locationProvider, $stateProvider) {
    console.log('routes loaded!');
    $urlRouterProvider.otherwise('/menu');

    $stateProvider
      .state('home', {
        url: '/welcome/:name',
        templateUrl: 'pages/home.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .state('menu', {
        url: '/menu',
        templateUrl: 'pages/menu.html',
        controller: 'menuCtrl',
        controllerAs: 'vm'
      });

  });
