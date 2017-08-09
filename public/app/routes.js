var app = angular.module('appRoutes', ['ngRoute'])
    .config(function($routeProvider, $locationProvider){
        $routeProvider
            .when('/', {
                templateUrl: "app/views/pages/home.html",
                authenticated: false
            })

            .when('/about', {
                templateUrl: "app/views/pages/about.html"
            })
            .when('/pengguna', {
                templateUrl: "app/views/pages/users.html",
                controller: 'regCtrl',
                controllerAs: 'register',
                // authenticated: true
            })
            .when('/profil', {
                templateUrl: "app/views/pages/users/profile.html",
                authenticated: true
            })
            // .when('/login', {
            //     templateUrl: "app/views/pages/users/login.html"
            // })
            .when('/logout', {
                templateUrl: "app/views/pages/users/logout.html",
                authenticated: true
            })
            .when('/inventaris',{
                templateUrl: "app/views/pages/inventaris/barang.html",
                controller: 'brgCtrl',
                controllerAs:'barang',
                authenticated: true
            })
            .otherwise({
                templateUrl: "app/views/404.html"
            });

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
    });

    app.run(['$rootScope', 'Auth','$location', function($rootScope, Auth, $location) {
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            // console.log(next.$$route.authenticated);
            if (next.$$route.authenticated == true) {
                if (!Auth.isLoggedIn()) {
                    event.preventDefault();
                    $location.path('/');
                }
            } else if (next.$$route.authenticated == false ) {
                if (Auth.isLoggedIn()) {
                    event.preventDefault();
                    $location.path('/profil')
                }
            }
        })
    }

    ]);
    