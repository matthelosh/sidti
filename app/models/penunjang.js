var mongoose = require('mongoose'),
    Schema  = mongoose.Schema;

    module.exports = function(penunjang) {
        var Kategori = new Schema({
            "namaKategori": String
        });

        var Lokasi = new Schema({
            "kode": String,
            "namaLokasi": String
        });


        var Status = new Schema({
            status: String
        });

        var Penunjang = {
            Kategori : mongoose.model('Kategori', Kategori, 'kategori'),
            Lokasi     : mongoose.model('Lokasi', Lokasi, 'lokasi'),
            Status  : mongoose.model('Status', Status, 'statusBarang')
        };

        return Penunjang;
    }
    

    


    // module.exports = mongoose.model("Kategori", schemaKategori, "kategori");

    // module.exports = mongoose.model("Lokasi", schemaLokasi, "lokasi");

    // module.exports = mongoose.model("Status", schemaStatus, "statusBarang");
