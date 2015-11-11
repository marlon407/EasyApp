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

			$scope.saveContest = function(){
				$scope.adType = {}
				var findType = Contest.getAllPrices().filter(function( obj ) {
					if(obj.type == $routeParams.type) return $scope.adType = obj;
				});
				
				console.log(parseInt($scope.contest.duration));
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
						$window.location.href = "/competicoes";
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
					console.log(response.data);
					$scope.contest = response.data[0];
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