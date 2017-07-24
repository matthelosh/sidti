angular.module('userServices', [])

    .factory('User', function($http){
        userFactory = {};

        // User.create(regData)
        userFactory.create = function(regData) {
            console.log(regData);
            return $http.post('/api/users', regData);
        }

        // User.get(users);
        userFactory.get = function(){
            return $http.get('/api/users');
                // console.log(users);
                
            
        }
            
        userFactory.remove = function(username) {
            console.log(username)
            return $http.delete('/api/users/'+username);
            
        }
        return userFactory;
    });