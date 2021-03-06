angular.module('MainCtrl', [])
	.controller('MainController', ['$scope',  'User', '$window', '$routeParams', function($scope, User, $window, $routeParams) {
		$window.scrollTo(0, 0);
		$scope.user = {name:localStorage.getItem("username"), password:localStorage.getItem("password")}
		$scope.logout = function(){
			$window.localStorage.removeItem("token");
			$window.localStorage.removeItem("username");
			$window.localStorage.removeItem("userid");
			$window.localStorage.removeItem("userLogged");
			$window.localStorage.removeItem("userRole");
			$scope.user = undefined;
			$window.location.href = "/";
		}
		
		$scope.getDesigners = function(){
			$window.scrollTo(0, 0);
			User.getAllDesigners().then(function(response){
				$scope.designers = response.data;
			});
		}
		
		$scope.howitworks = function(){
			$window.scrollTo(0, 0);
			$(document).foundation();
		}
		
		
		var validadeContact = function(contact){
			if (contact.name = undefined){
				$scope.error = true;
			}
			if (contact.email = undefined){
				$scope.error = true;
			}
			if (contact.subject = undefined){
				$scope.error = true;
			}
			if (contact.text = undefined){
				$scope.error = true;
			}
			
		}
		$scope.sendMessage = function(){
			if ($scope.contact == undefined || validadeContact($scope.contact)){
				$scope.error = true;
				$window.scrollTo(0, 0);
			}
			else{
				User.sendMessage($scope.contact).then(function(response){
					$scope.status = "Mensagem enviada"
				});
			}
		}
		
	}]);