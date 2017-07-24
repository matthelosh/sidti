angular.module('barangController', [])
    .controller('brgCtrl', function($scope){
        $scope.frmBarangShow = function(){
            $scope.frmBarang = !$scope.frmBarang;
        }
    });