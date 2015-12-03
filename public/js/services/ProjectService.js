angular.module('ProjectService', []).factory('Project', ['$http', '$window', function($http, $window) {
	return{
		upload: function(project){
			console.log("creating a new contest");
			project.user_id = $window.localStorage.getItem("userid");
			project.date = new Date()
			var req = {
				 method: 'POST',
				 url: '/uploadProject',
				 data: project
			};
			return $http(req);
		},
		saveImage: function(project_id, image_ids){
			var req = {
				 method: 'POST',
				 url: '/saveProjectImages',
				 data: {project_id:project_id,image_ids:image_ids}
			};
			return $http(req);
		},
		getProjectById: function(id){
			var req = {
				method: 'GET',
				url: '/getProjectById/',
				headers: {
					'id': id
				}
			};
			return $http(req);
		},
	}
}]);