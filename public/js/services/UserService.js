angular.module('UserService', []).factory('User', ['$http', '$window', function($http, $window) {
	return{
		authenticate : function(user) {
			var req = {
				 method: 'POST',
				 url: 'api/authenticate',
				 data: user
			};

			return $http(req);
		},
		
		getUser: function(username){
			var req = {
				method: 'GET',
				url: 'api/getUser',
				data: {token:$window.sessionStorage.token, username: username},
				headers: {
					'x-access-token': $window.localStorage.getItem("token"),
					'username': username
				}
			};
			return $http(req);
		},
		
		createUser: function(user){
			console.log("creating user");
			var req = {
				 method: 'POST',
				 url: '/createUser',
				 data: user
			};
			return $http(req);
		},
		
		getAllDesigners: function(){
			console.log("getting designres");
			var req = {
				method: "GET", 
				url: "/getAllDesigners"
			};
			return $http(req);
		}
	}
}]);