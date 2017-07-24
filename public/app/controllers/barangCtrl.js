angular.module('barangController', ['authServices'])
    .controller('brgCtrl', function(Auth, $scope){
        $scope.frmBarangShow = function(){
            $scope.frmBarang = !$scope.frmBarang;
        };
        $scope.orderProperty = 'namaBarang';
        $scope.dataBarang = [
            {
                kodeBarang: "pcmm0102",
                namaBarang: "PC MM 102",
                kategori: "Alat Praktek",
                lokasi: "Lab IT 06",
                kondisi: {
                    baik: "Rusak",
                    lengkap: "Lengkap"
                },
                status: "Dalam Perbaikan"
            },
            {
                kodeBarang: "pcmm0103",
                namaBarang: "PC MM 103",
                kategori: "Alat Praktek",
                lokasi: "Lab IT 06",
                kondisi: {
                    baik: "Baik",
                    lengkap: "Lengkap"
                },
                status: "Siap"
            },
              {
                kodeBarang: "dlsr05",
                namaBarang: "Kamera DLSR d3300",
                kategori: "Alat Praktek",
                lokasi: "Lab Fotografi",
                kondisi: {
                    baik: "Baik",
                    lengkap: "Lengkap"
                },
                status: "DIpinjam"
            },
            {
                kodeBarang: "vidsd01",
                namaBarang: "Kamera Video SD Sony 1000",
                kategori: "Alat Praktek",
                lokasi: "Lab Videografi",
                kondisi: {
                    baik: "Baik",
                    lengkap: "Lengkap"
                },
                status: "Siap"
            },
            {
                kodeBarang: "prnmm03",
                namaBarang: "Printer L300",
                kategori: "Alat Kantor",
                lokasi: "Ruang Produksi",
                kondisi: {
                    baik: "Baik",
                    lengkap: "Lengkap"
                },
                status: "Siap"
            }

        ];
        $scope.orderBy = function(orderName) {
            if ($scope.orderProperty == orderName) {
                $scope.orderProperty = '-' + orderName;
            } else if ($scope.orderProperty == '-' + orderName) {
                $scope.orderProperty = orderName;
            } else {
                $scope.orderProperty = orderName;
            }
        };
    });