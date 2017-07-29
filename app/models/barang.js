var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var barangSchema = new Schema({
    _id : {
        type: String,
        required: true,
        unique: true
    },
    namaBarang: {
        type: String,
        required: true
    },
    kategori: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'kategori'
    },
    lokasi: {
        type: String,
        ref: 'lokasi'
    },
    spesifikasi: String,
    imgBarang: String,
    statusBarang: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'statusBarang'
    },
    kondisi: {
        lengkap: Boolean,
        baik: Boolean
    },
    keterangan: String
});

module.exports = mongoose.model("Barang", barangSchema, "barangs");