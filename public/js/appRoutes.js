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
		.when('/:username', {
			templateUrl: 'views/user.html',
			controller: 'UserController'
		});
		$locationProvider.html5Mode(true);
}]);