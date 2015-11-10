angular.module('ContestCtrl', [])
.filter('translate', function() {
  return function(type) {
		var result = "";
    if(type == 1){result = "Banner Statico";}
		else{result = "Banner Dinâmico";}
    return result;
  };
})
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
				
				var someDate = new Date();
				var numberOfDaysToAdd = $scope.contest.duration;
				someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
				$scope.contest.duration = someDate;
				$scope.contest.user = 1;
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
	}]);