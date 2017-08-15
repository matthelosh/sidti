angular.module('barangController', ['barangServices', 'angularUtils.directives.dirPagination', 'fileModelDirectives'])
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

        app.frmMode = true;
       
        this.showFrmBarang = function() {
            $scope.frmTitle = 'Entry Data Barang';
            $scope.submitTitle = "Simpan";
            $scope.file = {};
            app.addBarang = true;
            app.editBarang = false;
            $("#frmBarang").modal();
        };
        // app.info = "Informasi";
        this.regBarang = function(dataBarang) {
            // console.log(app.dataBarang);
            Barang.create(app.dataBarang).then(function(msg) {
                console.log(msg);
                var msg = msg.data.message;
                app.info = msg;
                Barang.getAll();
                app.dataBarang = '';
                
            })
            app.reload();
        
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
                // console.log(brgEdit);
                app.addBarang = false;
                app.editBarang = true;
                app.dataBarang = brgEdit;
                app.dataBarang.kategori = brgEdit.kategori._id;
                app.dataBarang.lokasi = brgEdit.lokasi._id;
                app.dataBarang.statusBarang = brgEdit.statusBarang._id;
                $scope.frmTitle = "Update Data " + brgEdit.namaBarang;
                $scope.submitTitle = "Update";
                
                $("#frmBarang").modal();

            });
           
        };

        this.updBarang = function(dataBarang){
            console.log(app.dataBarang);
            Barang.updBarang(app.dataBarang).then(function(msg) {
                console.log(msg);
                
            })
            // app.reload();
        };

        this.delBarang = function(data_id) {
            $scope.dataId = data_id;
            $("#modalKonfirm").modal();
        }

        this.hpsBarang = function(data_id) {
            Barang.hpsBarang(data_id).then(function(msg) {
                console.log(msg);
                window.location.reload();
            });
        };

        app.getDetil = function(_id) {
            Barang.getEditBrg(_id).then(function(brgDetil) {
                // console.log(brgDetil.data);
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
        
    })
