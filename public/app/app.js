var sidti = angular.module('sidtiApp', ['appRoutes', 'userControllers', 'userServices', 'mainController', 'authServices', 'barangController', 'ngAnimate'])

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});