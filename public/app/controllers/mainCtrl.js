angular.module('mainController', ['authServices'])

.controller('mainCtrl', function(Auth, $timeout, $location, $scope, $route, $routeParams, $window,$rootScope){
    var app = this;
    $rootScope.$on('$routeChangeStart', function() {
            if (Auth.isLoggedIn()) {
            console.log('Success: User is logged in');
            Auth.getUser().then(function(data){
                console.log(data);
                app.realname = data.data.realname;
            });
            app.isLoggedIn = true;
            $scope.toggleClass = true;
            $scope.sideClass = !"sideHide";
            $scope.mainClass = "mainSlide";

        } else {
            console.log('Failure: User is not logged in');
            app.username = 'Kisanak';
            app.isLoggedIn = false;
            $scope.sideClass = "sideHide";
            $scope.mainSlide = "mainSlide";
        }
    });
    
    

    this.dologin = function(loginData) {
      Auth.login(app.loginData).then(function(data){
          app.message = data.data.message;
          if(data.data.success == false){
            return false;
          } else {
             $timeout(function() {
              app.loginData = '';
              $location.path('/about');
              $window.location.reload();
          }, 2000);
          }
         
      });
    };

    this.logout = function() {
        Auth.logout();
        $location.path('/logout');
        $timeout(function(){
            $location.path('/');
            $window.location.reload();
        }, 500);
    };

   $scope.sideToggle = function(){
       if(!Auth.isLoggedIn()){
             $timeout(function() {
            alert('Login dulu untuk menggunakan menu, Boss!');
            //Rencana: Pakai bootstrap modal
           }, 50);

       } else {
          $scope.toggleClass = !$scope.toggleClass;
          $scope.sideClass = !$scope.sideClass;
          $scope.mainClass = !$scope.mainClass;
       }
   }

//    $scope.sideClass = 'sideSlide';
});