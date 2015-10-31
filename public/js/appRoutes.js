angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', 
	function($routeProvider, $locationProvider) {

	$routeProvider
		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'UserController'
		})
		.when('/signup', {
			templateUrl: 'views/signup.html',
			controller: 'UserController'
		})
		.when('/como-funciona',{
			templateUrl: 'views/how-it-works.html',
			controller: 'MainController'
		})
		.when('/designers', {
			templateUrl: 'views/designers.html',
			controller: 'MainController'
		})
		.when('/competicoes', {
			templateUrl: 'views/contest/show.html',
			controller: 'MainController'
		})
		.when('/competicoes/novo', {
			templateUrl: 'views/contest/new.html',
			controller: 'ContestController'
		})
		.when('/competicoes/novo/step2/:type', {
			templateUrl: 'views/contest/step2.html',
			controller: 'ContestController'
		})
		.when('/:username', {
			templateUrl: 'views/user.html',
			controller: 'UserController'
		});
		$locationProvider.html5Mode(true);
}]);