var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var barangSchema = new Schema({
    _id : {
        type: String,
        required: true
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lokasi'
    },
    spesifikasi: {
        merk: String,
        tipe: String,
        satuan: String,
        vga: String
    },
    imgBarang: String,
    statusBarang: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'status'
    },
    kondisi: {
        lengkap: Boolean,
        baik: Boolean
    },
    keterangan: String
});

module.exports = mongoose.model("Barang", barangSchema, "barangs");