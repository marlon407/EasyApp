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
		.when('/competicoes/sucesso', {
			templateUrl: 'views/contest/processing.html',
			controller: 'ContestController'
		})
		.when('/competicoes/done', {
			templateUrl: 'views/contest/done.html',
			controller: 'ContestController'
		})
		.when('/competicoes/detalhes/:id', {
			templateUrl: 'views/contest/projectDetails.html',
			controller: 'ContestController'
		})
		.when('/competicoes/:id', {
			templateUrl: 'views/contest/detail.html',
			controller: 'ContestController'
		})
		.when('/projeto/novo/:id', {
			templateUrl: 'views/project/new.html',
			controller: 'ProjectController'
		})
		.when('/projeto/:id', {
			templateUrl: 'views/project/detail.html',
			controller: 'ProjectController'
		})
		.when('/perfil/:username', {
			templateUrl: 'views/user/user.html',
			controller: 'UserController'
		})
		.when('/perfil/edit/:username', {
			templateUrl: 'views/user/edit.html',
			controller: 'UserController'
		})
		.when('/erro', {
			templateUrl: 'views/not-found.html'
		})
		.when('/activeuser', {
			templateUrl: 'views/user/validating.html',
			controller: 'UserController'
		});
		$locationProvider.html5Mode(true);
}]);