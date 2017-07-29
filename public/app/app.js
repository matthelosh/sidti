var sidti = angular.module('sidtiApp', ['appRoutes', 'userControllers', 'userServices', 'mainController', 'authServices', 'barangController', 'ngAnimate', 'barangServices'])

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});