var homeCtrl = angular.module('homeCtrl', []);
homeCtrl.controller('homeCtrl', ['$scope', '$http', '$resource', '$location',
                           function($scope, $http, $resource, $location) {
	
	
	
	$http({
		method: "GET",
		url: "JSON/AirBP.json"
	}).success(function(data) {
		console.log("TabsContent data::  "+JSON.stringify(data));
		$scope.cardList = data;
		$scope.showitem = 0;
	}).error(function(data) {
    	alert("Service is not available!");
    	console.log('Error '+data);
    });	
	
	
	
	$scope.toggleItem  = function(id) {
		if(id == 4){
			id = -1;
		}
		$scope.showitem = id + 1;
	};
	
	
	
}]);		
		