angular.module('barangController', ['barangServices'])
    .controller('brgCtrl', function($scope, $http, Barang, Penunjang){

        $scope.frmBarangShow = function(){
            $scope.frmBarang = !$scope.frmBarang;
        };
        $scope.orderProperty = 'namaBarang';
        // $scope.barangs = [
        //     {
        //         kodeBarang: "pcmm0102",
        //         namaBarang: "PC MM 102",
        //         kategori: "Alat Praktek",
        //         lokasi: "Lab IT 06",
        //         kondisi: {
        //             baik: "Rusak",
        //             lengkap: "Lengkap"
        //         },
        //         status: "Dalam Perbaikan"
        //     },
        //     {
        //         kodeBarang: "pcmm0103",
        //         namaBarang: "PC MM 103",
        //         kategori: "Alat Praktek",
        //         lokasi: "Lab IT 06",
        //         kondisi: {
        //             baik: "Baik",
        //             lengkap: "Lengkap"
        //         },
        //         status: "Siap"
        //     },
        //       {
        //         kodeBarang: "dlsr05",
        //         namaBarang: "Kamera DLSR d3300",
        //         kategori: "Alat Praktek",
        //         lokasi: "Lab Fotografi",
        //         kondisi: {
        //             baik: "Baik",
        //             lengkap: "Lengkap"
        //         },
        //         status: "DIpinjam"
        //     },
        //     {
        //         kodeBarang: "vidsd01",
        //         namaBarang: "Kamera Video SD Sony 1000",
        //         kategori: "Alat Praktek",
        //         lokasi: "Lab Videografi",
        //         kondisi: {
        //             baik: "Baik",
        //             lengkap: "Lengkap"
        //         },
        //         status: "Siap"
        //     },
        //     {
        //         kodeBarang: "prnmm03",
        //         namaBarang: "Printer L300",
        //         kategori: "Alat Kantor",
        //         lokasi: "Ruang Produksi",
        //         kondisi: {
        //             baik: "Baik",
        //             lengkap: "Lengkap"
        //         },
        //         status: "Siap"
        //     }

        // ];
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
        // app.info = "Informasi";
        this.regBarang = function(dataBarang) {
            Barang.create(app.dataBarang).then(function(msg) {
                console.log(msg);
                var msg = msg.data.msg;
                app.info = msg;

                // app.info = msg;
            });
        }

        // Get All Barangs
        this.getBarangs = function() {
            Barang.getAll().then(function(barangs) {
                console.log(barangs.data);
                $scope.barangs = barangs.data;
            });
        }

        this.getBarangs();

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