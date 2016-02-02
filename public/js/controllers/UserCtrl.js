angular.module('UserCtrl', [])
.filter('translateStatus', ['Contest',  function(Contest) {
  return function(status_id) {
		var text;
		switch (status_id) {
			case 1:
					text = "Aberta";
					break;
			case 2:
					text = "Escolhendo vencedor";
					break;
			case 3:
					text = "Concluída";
					break;
			default:
					text = "Aguardando aprovação";
		}
		return text;	
	};
}])
	.controller('UserController', ['$scope',  'User', '$window','$routeParams',  function($scope, User, $window, $routeParams) {
		$scope.user = {}
		$scope.GetAll = function(){
			$scope.users = User.get();
		}
		
		var doAuthentication = function(user, path){
			User.authenticate($scope.user).then(function successCallback(response) {
					if(response.data.success){
						$window.localStorage.setItem("token", response.data.token);
						$window.localStorage.setItem("username", response.data.user.name);
						$window.localStorage.setItem("userid", response.data.user._id);
						$window.localStorage.setItem("userLogged", response.data.user);
						$window.localStorage.setItem("userRole", response.data.user.role);
						$window.location.href = path;
					}
				else{
						$window.localStorage.removeItem("token");
						$window.localStorage.removeItem("username");
						$window.localStorage.removeItem("userid");
						$window.localStorage.removeItem("userLogged");
						$window.localStorage.removeItem("userRole");
						console.log("no login")
						$scope.user = undefined;
						$scope.loginError = "Usuário ou Senha não encontrado!";
					}
				
				}, 
				function errorCallback(response) {
					console.log("error");
				});
		}
		
		$scope.login = function(){
			doAuthentication($scope.user, "/");
		}
		
		$scope.loadUser = function(){
			User.getUser($routeParams.username).then(function (response) {
				$scope.isOwner = false;
				console.log(response.data);
				if(response.data.success == true){
					if (response.data.user._id == $window.localStorage.getItem("userid")){
						$scope.isOwner = true;
						$scope.active = response.data.user.active;
					}
					$scope.current_user = response.data.user;
					$scope.user_contests = response.data.contests;
					$scope.user_projects = response.data.projects;
				}
				else{
					$window.location.href = "/erro";
				}
			});
		}
		
		$scope.create = function(){
			console.log($scope.user);
			if($scope.user.email == undefined || $scope.user.name == undefined || $scope.user.password == undefined){
				$scope.error = "Por favor preencha todos os campos";
			}
			else{
				User.createUser($scope.user).then(function (response) {
					if(response.data.success){
						doAuthentication($scope.user, "perfil/edit/"+$scope.user.name);
					}
					else {
						console.log("nao criou usuario");
						$scope.userTaken = "Nome de usuário já cadastrado! Por favor escolha outro.";
					}
				});
			}
		}
		
		$scope.loadSignup = function(){
			$scope.user.role = 0;
			$window.scrollTo(0, 0);
		}
		
		$scope.loadEdit = function(){
			User.getUser($routeParams.username).then(function (response) {
				if(response.data.success == true && response.data.user._id == $window.localStorage.getItem("userid")){
					$scope.current_user = response.data.user;
					$scope.user_contests = response.data.contests;
					$scope.user_projects = response.data.projects;
				}
				else{
					$window.location.href = "/";
				}
			});
		}
		
		$scope.editUser = function(){
			User.update($scope.current_user).then(function (response) {
				$window.location.href = "/perfil/"+$scope.current_user.name;
			});
		}
		
		$scope.activeUser = function(){
			$scope.status = "Atenticando usuário, aguarda..";
			$scope.message = "";
			console.log($routeParams.userId);
			User.activeuser($routeParams.userId).then(function (response) {
				$scope.status = "Usuário confirmado";
				$scope.message = "Seu usuário foi ativado! Agora você já pode aproveitar todos os benefícios da EasyAd";
				$scope.showLink = "Usuário confirmado";
			});
		}
	}]);