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
		saveImage: function(contest_id, image_ids){
			var req = {
				 method: 'POST',
				 url: '/saveImage',
				 data: {contest_id:contest_id,image_ids:image_ids}
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
		getClosedContests: function(){
			var req = {
				method: 'GET', 
				url: '/getClosedContests'
			};
			return $http(req);
		},
		getAllProjectsByContest: function(contest_id){
			var req = {
					method: 'POST',
					url: '/getAllProjectsByContest/',
					data: {contest_id:contest_id}
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
		setIntention: function(contest_id, user_id){
			var req = {
				 method: 'POST',
				 url: '/setIntention',
				 data: {contest_id:contest_id,user_id:user_id}
			};
			return $http(req);
		},
		getIntentions: function(contest_id, user_id){
			var req = {
				 method: 'POST',
				 url: '/getIntentions',
				 data: {contest_id:contest_id,user_id:user_id}
			};
			return $http(req);
		},
		getComments: function(contest_id){
			var req = {
				 method: 'POST',
				 url: '/getComments',
				 data: {contest_id:contest_id}
			};
			return $http(req);
		},
		postComment: function(comment){
			var req = {
				 method: 'POST',
				 url: '/postComment',
				 data: {comment:comment}
			};
			return $http(req);
		},
		setContestWinner: function(project_id, contest_id){
			var req = {
				 method: 'POST',
				 url: '/setContestWinner',
				 data: {project_id:project_id, contest_id:contest_id}
			};
			return $http(req);
		},
		
		getAllPrices: function(){
			var adTypes = [
			{
				'id': 1,
				'type': "static",
				'description': "Banner Statico",
				'price': 299.00,
			},
			{
				'id': 2,
				'type': "dinamic",
				'description': "Banner Dinâmico",
				'price': 499.00,
			},
	{
				'id': 3,
				'type': "flayer",
				'description': "Folheto",
				'price': 399.00,
			},
			{
				'id': 4,
				'type': "poster",
				'description': "Poster",
				'price': 499.00,
			},
			{
				'id': 5,
				'type': "outdoor",
				'description': "Outdoor",
				'price': 499.00,
			},
			{
				'id': 6,
				'type': "news",
				'description': "Jornal/Revista",
				'price': 399.00,
			},
			{
				'id': 7,
				'type': "folder",
				'description': "Folder",
				'price': 699.00,
			},
			{
				'id': 8,
				'type': "app",
				'description': "Apps",
				'price': 399.00,
			},
			{
				'id': 9,
				'type': "facebook-cover",
				'description': "Capa para facebook",
				'price': 299.00,
			},
			{
				'id': 10,
				'type': "frontage",
				'description': "Fachada",
				'price': 399.00,
			},
		]
			return adTypes;
		},
	}
}]);