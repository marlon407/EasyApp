angular.module('MainCtrl', [])
	.controller('MainController', ['$scope',  'User', '$window', '$routeParams', function($scope, User, $window, $routeParams) {
		
		$scope.user = {name:localStorage.getItem("username"), password:localStorage.getItem("password")}
		$scope.logout = function(){
			localStorage.removeItem("username");
			localStorage.removeItem("password");
			$scope.user = undefined;
			$window.location.href = "/";
		}
		
		$scope.loadUser = function(){
			User.getUser($routeParams.username).then(function (response) {
				console.log(response.data.user);
				$scope.current_user = response.data.user;
			});
		}
		
		$scope.getDesigners = function(){
			$window.scrollTo(0, 0);
			User.getAllDesigners().then(function(response){
				$scope.designers = response.data;
			});
		}
		
		$scope.howitworks = function(){
			$window.scrollTo(0, 0);
		}
		
	}]);