angular.module('mainController', ['authServices'])

.controller('mainCtrl', function(Auth, AuthToken, $timeout, $location, $scope, $route, $routeParams, $window,$rootScope, $interval){
    var app = this;
    app.checkSession = function() {
        if (Auth.isLoggedIn()) {
            // app.checkingSession = true;
            var interval = $interval(function() {
                var token = $window.localStorage.getItem('token');
                if (token == null){
                    $interval.cancel(interval);
                } else {
                    self.parseJwt = function(token) {
                        var base64Url = token.split('.')[1];
                        var base64 = base64Url.replace('-', '+').replace('_', '/');
                        return JSON.parse($window.atob(base64));
                    }
                    var expireTime = self.parseJwt(token);
                    var timeStamp = Math.floor(Date.now() / 1000);
                    // console.log(expireTime.exp);
                    // console.log(timeStamp);
                    var timeCheck = expireTime.exp - timeStamp;
                    // console.log('timecheck: ' + timeCheck);
                    if(timeCheck <= 5) {
                        console.log('token has expired');
                        $interval.cancel(interval);
                        showModal();
                    }
                }
            }, 2000);
        }
    };

    // app.checkSession();

    
    var showModal = function() {
         var token = $window.localStorage.getItem('token');
         self.parseJwt = function(token) {
                        var base64Url = token.split('.')[1];
                        var base64 = base64Url.replace('-', '+').replace('_', '/');
                        return JSON.parse($window.atob(base64));
                    }
        var expireTime = self.parseJwt(token);
        var timeStamp = Math.floor(Date.now() / 1000);
        var timeCheck = expireTime.exp - timeStamp;

        
        app.modalHeader = 'Info Sesi';
        app.modalBody = 'Sesi Anda akan segera berakhir. Waktu Anda tinggal: ' + timeCheck + ' detik. Apakah Anda ingin memperbarui sesi atau keluar sistem?';
        $("#sessionModal").modal({backdrop: "static"});
        
        
    };
    
    // };



    // app.loadme = false;
    $rootScope.$on('$routeChangeStart', function() {
        if (!app.checkingSession) app.checkSession();

             if(!app.checkSession) app.checkSession();
            if (Auth.isLoggedIn()) {
            console.log('Success: User is logged in');
            Auth.getUser().then(function(data){
                // console.log(data);
                app.realname = data.data.realname;
                app.username = data.data.username;
                app.email = data.data.email;
                app.loadme = true;
            });
            app.isLoggedIn = true;
            $scope.toggleClass = true;
            $scope.sideClass = !"sideHide";
            $scope.mainClass = "mainSlide";
            app.loadme = true;

        } else {
            console.log('Failure: User is not logged in');
            app.username = 'Kisanak';
            app.isLoggedIn = false;
            $scope.sideClass = "sideHide";
            $scope.mainSlide = "mainSlide";
        }

        if ($location.hash() == '_=_') $location.hash(null);
    });
    
    

    this.dologin = function(loginData) {
      Auth.login(app.loginData).then(function(data){
          app.message = data.data.message;
          if(data.data.success == false){
            return false;
          } else {
             $timeout(function() {
              app.loginData = '';
              $location.path('/profil');
              $window.location.reload();
              app.checkingSession();
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