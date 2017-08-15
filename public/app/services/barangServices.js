angular.module('barangServices', [])
    .factory('Barang', function($http){
        barangFactory = {};

        // Barang.create(dataBarang);
        barangFactory.create = function(dataBarang) {
            // console.log(dataBarang);
            var fd = new FormData();
            for(var key in dataBarang)
                fd.append (key, dataBarang[key]);

            return $http.post('/api/barang', fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            });
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

        barangFactory.updBarang = function(dataBarang) {
            var fd = new FormData();
            for(var key in dataBarang)
                fd.append (key, dataBarang[key]);

            return $http.post('/api/updBarang', fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            });
        };

        barangFactory.hpsBarang = function(_id) {
            return $http.delete('/api/barang/'+ _id);
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
