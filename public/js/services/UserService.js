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
				url: '/getUser',
				headers: {
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
		
		update: function(user){
			console.log("updating user");
			var req = {
				 method: 'POST',
				 url: '/updateUser',
				 data: user
			};
			return $http(req);
		},
		
		getAllDesigners: function(){
			var req = {
				method: "GET", 
				url: "/getAllDesigners"
			};
			return $http(req);
		}, 
		activeuser: function(user){
			var req = {
				 method: 'POST',
				 url: '/activeuser',
				 data: {userId:user}
			};
			return $http(req);
		},
		sendMessage: function(contact){
			var req = {
				 method: 'POST',
				 url: '/sendMessage',
				 data: {contact:contact}
			};
			return $http(req);
		},
	}
}]);