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

			var CONFIG = {

			};

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
						var inputFile = $("input[type=file]")[0].files[0];
						var params = {name: response.data.id+"_1", file: inputFile, type: inputFile.type, size: inputFile.size, 'public': false};
						QB.createSession(QBUser, function(err, result) {
							if (err) {
								console.log('Something went wrong: ' + err);
							} else {
								QB.content.createAndUpload(params, function(err, img_response){
									if (err) {
										console.log(err);
									} else {
										Contest.saveImage(parseInt(response.data.id), parseInt(img_response.id)).then(function (res) {
											$window.location.href = "/competicoes";
										});
									}
								});
							}
						});
					}
					else console.log("Contest error");
				});
			}

			$scope.getAllContests = function(){
				Contest.getContests().then(function(response){
					$scope.contests = response.data;
				});
			}
			
			$scope.showContest = function(){
				Contest.getContestById($routeParams.id).then(function(response){
					$scope.contest = response.data.contest[0];
					QB.createSession(QBUser, function(err, result) {
							if (err) {
								console.log('Something went wrong: ' + err);
							} else {
								var imageHTML = "<img src='" + QB.content.privateUrl(response.data.images[0].image_id+"/download") + "' />";
								$('.images').append(imageHTML);
							}
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