angular.module('barangServices', [])
    .factory('Barang', function($http){
        barangFactory = {};

        // Barang.create(dataBarang);
        barangFactory.create = function(dataBarang) {
            // console.log(dataBarang);
            return $http.post('/api/barang', dataBarang);
        };

        // Barang.getAll();
        barangFactory.getAll = function() {
            return $http.get('/api/barangs');
        }

        // getBarang(_id)
        barangFactory.getEditBrg = function(_id) {
            // console.log(_id);
            return $http.get('/api/barang/' + _id);
        }

        return barangFactory;
    })

    .factory('Penunjang', function($http) {
        penunjangFactory = {};

        // Penunjang.getKategori()
        penunjangFactory.getKategori = function() {
            return $http.get('/api/kategori');
            // console.log(kategoris);
        };

        // Penunjang.getLokasi()
        penunjangFactory.getLokasi = function() {
            return $http.get('/api/lokasi');
        };

        // Penunjang.getStatus();
        penunjangFactory.getStatus = function() {
            return $http.get('/api/status');
        }

        return penunjangFactory;
    })
