angular.module('ProjectCtrl', [])
	.controller('ProjectController', ['$scope', 'Project', '$routeParams','$window', function($scope, Project, $routeParams, $window) {
			var QBApp = {
				appId: 31428,
				authKey: 'NhN67EHRXfqqFYf',
				authSecret: 'BQkHWzDYjjAyWmY'
			};

			var QBUser = {
			 login: "marlon407_4960566_12213",
			 password: "161094ikarim"
			};

			var CONFIG = {};

			QB.init(QBApp.appId, QBApp.authKey, QBApp.authSecret, CONFIG);
		
			$scope.newProject = function(){
				$scope.contestId = $routeParams.id;
				$scope.project = {contest_id: $routeParams.id};
				$scope.image_ids = [];
				$window.scrollTo(0, 0);
			}
			
			$scope.upload = function(){
				Project.upload($scope.project).then(function (response) {
					Project.saveImage(response.data.id.toString(),$scope.image_ids).then(function (res) {
						console.log("images saved");
						$window.location.href = "/projeto/"+response.data.id;
					});
				});
			}
		
			$scope.uploadImage = function (input) {
				var inputFile = input.files[0];
				var load = "<li class='list-in-grid'><div id='"+inputFile.type+inputFile.size+"' class='loader'>Loading...</div></li>"
				$(".images-area").append(load);
				var box = $(".box");
				$(".box").remove();
				var params = {name: inputFile.name, file: inputFile, type: inputFile.type, size: inputFile.size, 'public': false};
					QB.createSession(QBUser, function(err, result) {
						if (err) {
							console.log('Something went wrong: ' + err);
						} else {
							QB.content.createAndUpload(params, function(err, img_response){
								if (err) {
									console.log(err);
								} else {
									document.getElementById(inputFile.type+inputFile.size).parentElement.remove();
									var imageHTML = "<li class='list-in-grid'><img src='" + QB.content.privateUrl(img_response.id+"/download") + "' /></li>";
									$(".images-area").append(imageHTML);
									if($scope.image_ids.length <= 2) $(".image-section").append(box);
									$scope.image_ids.push(img_response.id);
								}
							});
						}
					});
    	}
			
			$scope.showProject = function(){
				$window.scrollTo(0, 0); 
				Project.getProjectById($routeParams.id).then(function(response){
					$scope.project = response.data.project[0];
					QB.createSession(QBUser, function(err, result) {
							if (err) {
								console.log('Something went wrong: ' + err);
							} else {
								for(var i = 0; i< response.data.images.length; i++){
									var path = QB.content.privateUrl(response.data.images[i].image_id+"/download");
									var imageHTML = "<li><a target='_blank' href='"+path+"' data-lightbox='image-1' data-title='My caption'><img src='"+path+"'></a></li>"
									$('.images-grid').append(imageHTML);
								}
							}
					});
				});
			}
		}]);