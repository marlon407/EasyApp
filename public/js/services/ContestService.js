angular.module('ContestService', []).factory('Contest', ['$http', '$window', function($http, $window) {
	return{
		saveContest: function(contest){
			console.log("creating a new contest");
			var req = {
				 method: 'POST',
				 url: '/newContest',
				 data: contest
			};
			return $http(req);
		},
		
		getContests: function(){
			var req = {
				method: 'GET',
				url: '/getContests'
			};
			return $http(req);
		},
		getContestById: function(id){
			var req = {
				method: 'GET',
				url: '/getContestById/',
				headers: {
					'id': id
				}
			};
			return $http(req);
		},
		getAllPrices: function(){
			var adTypes = [
			{
				'id': 1,
				'type': "static",
				'description': "Banner Statico",
				'price': 199.99,
			},
			{
				'id': 2,
				'type': "dinamic",
				'description': "Banner Dinâmico",
				'price': 199.99,
			},
	{
				'id': 3,
				'type': "flayer",
				'description': "Flayer",
				'price': 199.99,
			},
			{
				'id': 4,
				'type': "poster",
				'description': "Poster",
				'price': 199.99,
			},
			{
				'id': 5,
				'type': "outdoor",
				'description': "Outdoor",
				'price': 199.99,
			},
			{
				'id': 6,
				'type': "news",
				'description': "Jornal/Revista",
				'price': 199.99,
			},
			{
				'id': 7,
				'type': "internet",
				'description': "Internet",
				'price': 199.99,
			},
			{
				'id': 8,
				'type': "app",
				'description': "Apps",
				'price': 199.99,
			},
		]
			return adTypes;
		},
	}
}]);