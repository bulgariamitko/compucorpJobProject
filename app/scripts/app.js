'use strict';

/**
 * @ngdoc overview
 * @name compucorpJobProjectApp
 * @description
 * # compucorpJobProjectApp
 *
 * Main module of the application.
 */
angular
  .module('compucorpJobProjectApp', [
    // 'ngAnimate',
    // 'ngAria',
    // 'ngCookies',
    // 'ngMessages',
    // 'ngResource',
    'ngRoute',
    // 'ngSanitize',
    // 'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {

    $locationProvider.hashPrefix('');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
