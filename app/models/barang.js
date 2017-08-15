var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var barangSchema = new Schema({
    _id : {
        type: String,
        // required: true,
        // unique: true
    },
    namaBarang: {
        type: String,
        required: true
    },
    kategori: {
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        ref: 'Kategori'
    },
    lokasi: {
        type: String,
        ref: 'Lokasi'
    },
    spesifikasi: String,
    imgBarang: String,
    statusBarang: {
        type: String,
        ref: 'Status'
    },
    kondisi: {
        lengkap: String,
        baik: String
    },
    keterangan: String
});

module.exports = mongoose.model("Barang", barangSchema, "barang");