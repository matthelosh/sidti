angular.module("userControllers", ['userServices'])
  .controller('regCtrl', function($http, User) {
    var app = this;
    this.regUser = function(regData){
      console.log(regData);
      User.create(app.regData).then(function(data){ 
          console.log(data.data.message);
            app.message = data.data.message;
            app.regData = '';
      });
    };

    this.getUser = function(){
      User.get().then(function(users){
        app.users = users.data;
      });
    };

    this.remUser = function(username){
      // console.log(username);
      User.remove(username).then(function(data){
        var msg = data.data.message;
        alert(msg);
      });
    }
  });