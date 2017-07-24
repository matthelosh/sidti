angular.module('appRoutes', ['ngRoute'])
    .config(function($routeProvider, $locationProvider){
        $routeProvider
            .when('/', {
                templateUrl: "app/views/pages/home.html"
            })

            .when('/about', {
                templateUrl: "app/views/pages/about.html"
            })
            .when('/pengguna', {
                templateUrl: "app/views/pages/users.html",
                controller: 'regCtrl',
                controllerAs: 'register'
            })
            .when('/login', {
                templateUrl: "app/views/pages/users/login.html"
            })
            .when('/logout', {
                templateUrl: "app/views/pages/users/logout.html"
            })
            .when('/barang',{
                templateUrl: "app/views/pages/inventaris/barang.html",
                controller: 'brgCtrl'
            })
            .otherwise({
                templateUrl: "app/views/404.html"
            });

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
    });
