angular.module('UserCtrl', [])
	.controller('UserController', ['$scope',  'User', '$window', function($scope, User, $window) {
		$scope.user = {}
		$scope.GetAll = function(){
			$scope.users = User.get();
		}
		
		$scope.create = function(nerd){
			$scope.users = User.create(nerd);
		}
		
		var doAuthentication = function(user){
			User.authenticate($scope.user).then(function successCallback(response) {
		    	console.log(response.data.user);
					if(response.data.success){
						$window.localStorage.setItem("token", response.data.token);
						$window.localStorage.setItem("username", response.data.user.name);
						$window.localStorage.setItem("password", response.data.user.password);
						$window.localStorage.setItem("userrole", response.data.user.role);
						$window.localStorage.setItem("userid", response.data.user._id);
						$window.location.href = "/";
					}
				else{
						$window.localStorage.removeItem("token");
						$window.localStorage.removeItem("username");
						$window.localStorage.removeItem("password");
						console.log("no login")
						user = undefined;
					}
				
				}, 
				function errorCallback(response) {
					console.log("error");
				});
		}
		
		$scope.login = function(){
			doAuthentication($scope.user);
		}
		
		$scope.create = function(){
			User.createUser($scope.user).then(function (response) {
				if(response.data.success){
					console.log("user created");
					doAuthentication($scope.user);
				}
				else console.log("nao criou usuario");
			});	
		}
	}]);