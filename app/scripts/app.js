'use strict';

/**
 * @ngdoc overview
 * @name jodomaxApp
 * @description
 * # jodomaxApp
 *
 * Main module of the application.
 */
angular
  .module('jodomaxApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'ngFileUpload'
  ])
  .config(function ($routeProvider, $mdThemingProvider, $mdIconProvider) {
    $mdIconProvider
      .defaultIconSet('./assets/svg/avatars.svg', 128)
      .icon('menu'       , './assets/svg/menu.svg'        , 24)
      .icon('share'      , './assets/svg/share.svg'       , 24)
      .icon('google_plus', './assets/svg/google_plus.svg' , 512)
      .icon('hangouts'   , './assets/svg/hangouts.svg'    , 512)
      .icon('twitter'    , './assets/svg/twitter.svg'     , 512)
      .icon('phone'      , './assets/svg/phone.svg'       , 512);

    $mdThemingProvider.theme('default');
      // .primaryPalette('brown')
      // .accentPalette('red');

    $routeProvider
      .when('/', {
        templateUrl: 'views/loading.html',
        controller: 'LoadingCtrl'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/category', {
        templateUrl: 'views/category.html',
        controller: 'CategoryCtrl'
      })
      .when('/product', {
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl'
      })
      .when('/pos', {
        templateUrl: 'views/pos.html',
        controller: 'PosCtrl'
      })
      .when('/attribute', {
        templateUrl: 'views/attribute.html',
        controller: 'AttributeCtrl'
      })
      .when('/attributegroup', {
        templateUrl: 'views/attributegroup.html',
        controller: 'AttributeGroupCtrl'
      })
      .when('/UserGroup', {
        templateUrl: 'views/usergroup.html',
        controller: 'UserGroupCtrl'
      })
      .when('/User', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .when('/Discount', {
        templateUrl: 'views/discount.html',
        controller: 'DiscountCtrl'
      })
      .when('/StockIn', {
        templateUrl: 'views/stockin.html',
        controller: 'StockinCtrl'
      })
      .when('/Store', {
        templateUrl: 'views/store.html',
        controller: 'StoreCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  }).run([
    '$rootScope',
    '$mdSidenav',
    '$location',
    'dbService',
    'AttributeGroup',
    'Auth',
    function(
      $rootScope,
      $mdSidenav,
      $location,
      dbService,
      AttributeGroup,
      Auth
    ){

    $rootScope.isDbReady = false;
    $rootScope.userName = '';
    $rootScope.getUserName = function() {
      return Auth.getLoginName();
    };

    $rootScope.toggleSidenav = function(id) {
      $mdSidenav(id).toggle();
    };

    $rootScope.gotoPage = function(path) {
      $location.path(path);
      $mdSidenav('app-left').toggle();
    };

    dbService.dbDef();
    dbService.dbInit().then(function(db){
      $rootScope.isDbReady = true;

      AttributeGroup.getAll().then(function(ag){
        AttributeGroup.attributeGroup = ag;
        $location.path('/pos');
      });
    });

    $rootScope.logout = function() {
      Auth.clearLogin();
      $location.path( "/login" );
    };

    $rootScope.isLogin = function() {
      return Auth.isLogin();
    };

    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if ( !$rootScope.isDbReady ) {
        if ( next.templateUrl == "views/loading.html" ) {
        } else {
          $location.path( "/" );
        }
      }

      if ( ! Auth.isLogin() ) {
        if ( next.templateUrl == "view/login.html" ) {
        } else {
          $location.path( "/login" );
        }
      }
    });

    console.log('run');

  }]);
