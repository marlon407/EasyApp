angular.module('ContestCtrl', [])
.filter('translate', ['Contest',  function(Contest) {
  return function(type) {
		var result = "";
		var findType = Contest.getAllPrices().filter(function( obj ) {
			if(obj.id == type) return result = obj.description;
		});
    return result;
  };
}])
	.controller('ContestController', ['$scope', 'Contest', '$window','$routeParams', 
		function($scope, Contest, $window, $routeParams){
			$scope.newContest = function(){
				$scope.contest = {}
				$scope.image_ids = []
				$window.scrollTo(0, 0);
			}
			
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

			$scope.saveContest = function(){
				$scope.adType = {}
				var findType = Contest.getAllPrices().filter(function( obj ) {
					if(obj.type == $routeParams.type) return $scope.adType = obj;
				});
				var someDate = new Date();
				var numberOfDaysToAdd = parseInt($scope.contest.duration);
				someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
				$scope.contest.duration = someDate;
				$scope.contest.user = $window.localStorage.getItem("userid");
				$scope.contest.username = $window.localStorage.getItem("username");
				$scope.contest.type = $scope.adType.id;
				$scope.contest.price = $scope.adType.price;
				Contest.saveContest($scope.contest).then(function (response) {
					if(response.data.success){
						console.log("contest created");
						Contest.saveImage(response.data.id.toString(),$scope.image_ids).then(function (res) {
								console.log("images saved");
								$window.location.href = "/competicoes";
							});
						}
						else console.log("Contest error");
				});
			}
			
			$scope.uploadImage = function (input) {
				var inputFile = input.files[0];
				var load = "<li class='list-in-grid'><div id='"+inputFile.type+inputFile.size+"' class='loader'>Loading...</div></li>"
				$(".images-area").append(load);
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
									$scope.image_ids.push(img_response.id);
								}
							});
						}
					});
    	}

			$scope.getAllContests = function(){
				Contest.getContests().then(function(response){
					$scope.contests = response.data;
				});
			}
			
			$scope.setIntention = function(){
				Contest.setIntention($scope.contest._id, $window.localStorage.getItem("userid")).then(function(response){
					console.log(response.data.count)
					$(".intend_btn").text("Participando");
					$(".intend_btn").prop("disabled", "disabled");
					$(".intend_count").text(response.data.count);
				});
			}
			
			$scope.showContest = function(){
				$window.scrollTo(0, 0); 
				var role = $window.localStorage.getItem("userRole")
				$scope.isDesigner = role == 1
				console.log($scope.isDesigner);
				Contest.getContestById($routeParams.id).then(function(response){
					$scope.contest = response.data.contest[0];
					QB.createSession(QBUser, function(err, result) {
							if (err) {
								console.log('Something went wrong: ' + err);
							} else {
								for(var i = 0; i< response.data.images.length; i++){
									var imageHTML = "<li><img class='image-in-grid' src='" + 		QB.content.privateUrl(response.data.images[i].image_id+"/download") + "' /></li>";
									$('.images-grid').append(imageHTML);
								}
							}
					});
					Contest.getIntentions($routeParams.id, $window.localStorage.getItem("userid")).then(function(response){
						if(response.data.isPlaying){
							$(".intend_btn").text("Participando");
							$(".intend_btn").prop("disabled", "disabled");
						}
						$(".intend_count").text(response.data.allByContest);
					});
				});
			}
			
	}]).filter('tranformMonth', function(){
	return function(month) {
		var result = "";
		if(month == 1)
			return "Jan";
		else if(month == 2)
			return "Fev"
    else if(month == 3)
			return "Mar"
		else if(month == 4)
			return "Abr"
		else if(month == 5)
			return "Mai"
		else if(month == 6)
			return "Jun"
		else if(month == 7)
			return "Jul"
		else if(month == 8)
			return "Ago"
		else if(month == 9)
			return "Set"
		else if(month == 10)
			return "Out"
		else if(month == 11)
			return "Nov"
		else if(month == 12)
			return "Dec"
  };
});