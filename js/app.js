var wdsDemo = angular.module('WoodSite', ['ngResource', 'ngCookies', 'ngRoute', 'homeCtrl']);

window.routes =
{
    "/home": {
    	templateUrl : 'views/home.html',
		controller : 'homeCtrl',
		requireLogin: true
    }
};

wdsDemo.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {	
	for(var path in window.routes) {
        $routeProvider.when(path, window.routes[path]);
    }
    $routeProvider.otherwise({redirectTo: '/home'});		

}]);

wdsDemo.run(['$rootScope', '$location', '$cookieStore', '$route', 
             	function($rootScope, $location, $cookieStore, $route) {
	// keep user logged in after page refresh
	$rootScope.globals = $cookieStore.get('globals') || {};			
	$rootScope.$on('$locationChangeStart', function(event, next, current) {
		// redirect to login page if not logged in
		if ($location.path() == '/home'
				&& !$rootScope.globals.currentUser) {
		}	
	});	
	$rootScope.$on('$locationChangeSuccess', function(event) {
        $rootScope.previousLocation = $rootScope.actualLocation;
        $rootScope.actualLocation = $location.path();
    });   
   
}]);

