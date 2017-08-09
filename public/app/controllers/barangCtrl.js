angular.module('barangController', ['barangServices'])
    .controller('brgCtrl', function($scope, $http, Barang, Penunjang, $window){
        
        $scope.frmBarangShow = function(){
            $scope.frmBarang = !$scope.frmBarang;
        };
        $scope.orderProperty = 'namaBarang';
        $scope.orderBy = function(orderName) {
            if ($scope.orderProperty == orderName) {
                $scope.orderProperty = '-' + orderName;
            } else if ($scope.orderProperty == '-' + orderName) {
                $scope.orderProperty = orderName;
            } else {
                $scope.orderProperty = orderName;
            }
        };

        // Controller for register Barang
        var app = this;
       
        this.showFrmBarang = function() {
            $scope.frmTitle = 'Entry Data Barang';
            $scope.submitTitle = "Simpan";
            $("#frmBarang").modal();
        };
        // app.info = "Informasi";
        this.regBarang = function(dataBarang) {
            Barang.create(app.dataBarang).then(function(msg) {
                console.log(msg);
                var msg = msg.data.msg;
                app.info = msg;
                Barang.getAll();
                app.dataBarang = '';
            });
        };
        // Get All Barangs
        this.getBarangs = function() {
            Barang.getAll().then(function(barangs) {
                // console.log(barangs.data);
                $scope.barangs = barangs.data;
            });
        };

        this.getBarangs();


        // Form Edit Barang
        this.getEditBrg = function(data_id) {
            Barang.getEditBrg(data_id).then(function(brgEdit) {
                var brgEdit = brgEdit.data;
                console.log(brgEdit);
                // $scope.brgEdit = brgEdit;
                app.editMode = true;
                $scope.editBarang = brgEdit;
                $scope.katSelected = brgEdit.kategori._id;
                $scope.lokSelected = brgEdit.lokasi._id;
                $scope.statSelected = brgEdit.statusBarang._id;
                $scope.frmTitle = "Update Data " + brgEdit.namaBarang;
                $scope.submitTitle = "Update";
                app.dataBarang = brgEdit;
                $("#frmBarang").modal();

            });
           
        }

        app.getDetil = function(_id) {
            Barang.getEditBrg(_id).then(function(brgDetil) {
                console.log(brgDetil.data);
                $scope.brgDetil = brgDetil.data;
                $("#modalDetil").modal();
            });
        }

        app.reload = function($location) {
            window.location.reload();
        }

        var getKategori = function() {
            Penunjang.getKategori().then(function(kategoris) {
                // console.log(kategoris);
                $scope.kategoris = kategoris.data;
                
            });
        }
        getKategori();

        var getLokasi = function() {
            Penunjang.getLokasi().then(function(lokasis) {
                $scope.lokasis = lokasis.data;
            });
        }
        getLokasi();

        var getStatus = function() {
            Penunjang.getStatus().then(function(statuses) {
                $scope.statuses = statuses.data;
            });
        }
        getStatus();
        
    });