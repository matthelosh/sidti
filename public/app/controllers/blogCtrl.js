angular.module('blogController', [])
	.controller('blogCtrl', function($scope){
		$scope.header='This is Blog Page';
		$scope.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem ab laudantium, animi accusamus. Obcaecati quibusdam voluptatibus nesciunt illum iste mollitia reprehenderit, molestias amet incidunt saepe atque debitis qui aliquid inventore!';
	});