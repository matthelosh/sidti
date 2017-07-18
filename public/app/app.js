var sidti = angular.module('sidtiApp', ['ngRoute', 'ngAnimate', 'ngSanitize']);

sidti.config(function($routeProvider, $locationProvider){
	$routeProvider
		.when("/", {
			templateUrl: "app/views/pages/home.html",
			controller: "homeController"
		})

		.when('/about', {
			templateUrl: "app/views/pages/about.html",
			controller: "aboutController"
		})

		.when('/pengguna', {
			templateUrl: "app/views/pages/users.html",
			controller: "usersController"
		})

		.when('/blog/baca/:id', {
			templateUrl: "app/views/pages/baca.html", 
			controller: "bacaPost"
		})

		.when('/lurah', {
			templateUrl: "app/views/larangan/index.html",
			controller: "lurahController"
		})

		.when('/register',{
			templateUrl: "app/views/pages/daftar.html",
			controller: "addUser"
		})

		.otherwise({
			templateUrl: "app/views/404.html"
		});
		$locationProvider.html5Mode({
		    enabled: true,
		    requireBase: false
  });
});


sidti
	.controller('homeController', function($scope){
		$scope.pageClass = 'page-home';
	});

sidti.controller('aboutController', function($scope){
		$scope.pageClass = 'page-about';
	});

sidti.controller('usersController', function($scope, $http){
	$scope.addUser = addUser;
	$http
		.get("/api/users")
		.success(function(users){
			console.log(users);
			$scope.users = users;
		});
	function addUser(user){
		console.log(user);
		$http
			.post('api/users', user)
			.success(function(msg){
				console.log(msg);
				// $scope.users = '';
				$scope.message = msg;
			});
	}
});

sidti.controller('blogController', function($scope, $http){

	$http
		.get("/umum/sidtimeme")
		.success(function(posts){
			$scope.posts = posts;
		});


});

sidti.controller('lurahController', function($http, $scope){
	$scope.createPost = createPost;
	
	function createPost(post){
		$http
			.post('/api/post', post)
			.success(function(pesan){
				$scope.post = ''
			});
		// console.log(post);
	}
});

sidti.controller('addUser', function($http, $scope){
	$scope.addUser = addUser;
	function addUser(user){
		$http
			.post('/api/users', user)
			.success(function(pesan){
				console.log(pesan);
			});
	}
});

sidti.controller('bacaPost', function($scope, $http, $routeParams){
	var postId = $routeParams.id;
	// console.log('/api/'+postId)
	$http
		.get('/umum/baca/'+ postId )
		.success(function(post){
			$scope.post = post;
			$scope.comment = post.comments;
			// console.log(post);
			// getComment;
		});
	// function getComment(){
	// 		$http
	// 			.get("/api/getComments/"+ slug)
	// 			.success(function(comments){
	// 				$scope.comment = comments;
	// 			});
	// 	}
});

sidti.controller('postComment', function($scope, $http, $window){
	$scope.postComment = postComment;
	function postComment(comment, slug){
		$http
			.post('/api/postComment/'+ slug, comment)
			.success(function(){
				$scope.comment = '';
				$window.location.reload();
			});

		
	}
});

// numii.controller('toggleMenu',  function($scope){
// 	$scope.toggleOn = toggleOn;

// 	// function toggleOn(){
// 	// 	// var toggle = angular.element(document.querySelector('#menuToggle'));
// 	// 	// toggle.removeClass('fa-toggle-off').addClass('fa-toggle-on');
// 	// }
// });
