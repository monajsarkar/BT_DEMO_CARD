var homeCtrl = angular.module('homeCtrl', []);
homeCtrl.controller('homeCtrl', ['$scope', '$http', '$resource', '$location', '$rootScope',
                           function($scope, $http, $resource, $location, $rootScope) {
	
	$scope.sortingOrder = sortingOrder;
    $scope.reverse = false;
	
	$http({
		method: "GET",
		url: "JSON/Card.json"
	}).success(function(data) {
		console.log("TabsContent data::  "+JSON.stringify(data));
		$scope.cardList = data;
	}).error(function(data) {
    	alert("Service is not available!");
    	console.log('Error '+data);
    });	
	
	$scope.sort_by = function(newSortingOrder) {
		if ($scope.sortingOrder == newSortingOrder){
			$scope.reverse = !$scope.reverse;
		}
		$scope.sortingOrder = newSortingOrder;
		$('th i').each(function(){
			$(this).removeClass().addClass('icon-sort');
		});
		if ($scope.reverse){
			$('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-up');
		}else{
			$('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-down');
		}	
	};
	
}]);		
		