var User    = require('../models/user');
var jwt     = require('jsonwebtoken');
var slugify = require('slugify');
var multer = require('multer');
// var Post    = require('../models/blog');
var Barang  = require('../models/barang');

var Penunjang = require('../models/penunjang')(Penunjang);
var secret  = 'culip2511';
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/assets/img/uploads')
  },
  filename: function (req, file, cb) {
    if(!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      var err = new Error();
      err.code = 'filetype';
      return cb(err);
    } else {
      cb (null, Date.now() + '-' +file.originalname);
    }
  } 
});

var upload = multer({ 
  storage: storage,
  limits: { fileSize: 10000000 }
}).single('imgBarang');

// var upload = multer({storage: storage});



module.exports = function(router){

  router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:8080');
    res.header("Access-Control-Allow-Methods", 'GET, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With, content-type, application/json');
    next();
  });

  
  router.post('/users', function(req, res){
    console.log(req.body.username);
    var user = new User();
    user.username = req.body.username;
    user.realname = req.body.realname;
    user.password = req.body.password;
    user.email    = req.body.email;
    if (req.body.username == null || req.body.username == "" || req.body.password == '' || req.body.email == '' || req.body.realname == '') {
      res.json({ success: false, message:'Ensure username, password and email were provided' })
      
    } else {
      user.save((err)=>{
        if(err){
          
          if (err.errors.realname) {
            res.json({ success: false, message:err.errors.realname.message });
          } else if (err.errors.email) {
            res.json({ success: false, message:err.errors.email.message });
          } else if (err.errors.usename) {
            res.json({ success: false, message:err.errors.username.message});
          }
        }else{
          res.json({ success: true, message:'User created' });
        }
      });
    }

  });

// Login Route
  router.post('/authenticate', function(req, res){
    User.findOne({ username: req.body.username}).select('email username password realname pic isAdmin').exec(function(err,user){
      if (err) throw err;

      if(!user){
        res.json({success: false, message: 'user not found'});
      } else if (user) {
        if(req.body.password) {
          var validPassword = user.comparePassword(req.body.password);
        } else {
          res.json({ success: false, message: "Password not provided yet"});
        }
        
        if(!validPassword) {
          res.json({ success: false, message:'Password is wrong'});
        } else {
          console.log(user.pic);
          var token = jwt.sign({ username: user.username, realname: user.realname, email: user.email, pic: user.pic, isAdmin: user.isAdmin }, secret, { expiresIn: '10h'} );
          res.json({success: true, message: 'Pengguna boleh masuk. Sebentar . .', token: token});
        }
      }
    });
  });
  // Get token decrypted
  router.use(function(req, res, next) {
    var token = req.body.token || req.body.query || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          res.json({ success: false, message: 'Token invalid'});
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.json({ success: false, message: 'No Token'})
    }
  });
  router.post('/me', function(req, res){
    res.send(req.decoded);
  });
  // router.get('/', function(req, res){
  //   res.send('Route API');
  // });

  router.get('/users', function(req, res){
    User.find({}, function(err, users){
      if(err) throw err;
      else{
        // console.log(users);
        res.json(users);
      }
    });
  });

  router.delete('/users/:username', function(req, res){
    var user = req.params.username;
    User.findOneAndRemove({ username: user}, function(err, success){
      if (err) return res.send(err);
      if (success) {
        res.json({ success: true, message: "User "+ user +" berhasil dihapus"});
      } else {
        res.json({ success: false, message: "User "+ user +" gagal dihapus" });
      }
    });
  });

  // Route Get Kategori, Lokasi, Status
  router.get('/kategori', function(req, res) {
    Penunjang.Kategori.find({}, function(err, kategoris) {
      res.json(kategoris);
    });
  });

  router.get('/lokasi', function(req, res) {
    Penunjang.Lokasi.find({}, function(err, lokasis){
      // console.log(lokasis);
      res.json(lokasis);
    });
  });

  router.get('/status', function(req, res) {
    Penunjang.Status.find({}, function(err, statuses) {
      res.json(statuses);
    });
  });


  // Route Barang
  router.post('/barang', function(req, res, file){
    
    upload(req, res, function(err, simpan) {
      // console.log(req.body);
      console.log(req.file.filename);
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          res.json({ success: false, message: 'Ukuran gambar terlalu besar. Max 10MB'});
        } else if(err.code === 'filetype') {
          res.json({ success: false, message: 'Gambar haruslah jpeg, jpg, png.' });
        } else {
          console.log(err);
          res.json({ success: false, message: 'Gagal menyimpan gambar barang'});
        }
      } else {
        if (!req.file) {
          res.json({ success: false, message: 'Tidak ada gambar terpilih '});
        } else {
          console.log(req.file.filename);
          var barang = new Barang();
          barang._id =  req.body._id;
          barang.namaBarang= req.body.namaBarang;
          barang.kategori = req.body.kategori;
          barang.lokasi = req.body.lokasi;
          barang.imgBarang = req.file.filename;
          barang.spesifikasi = req.body.spesifikasi;
          barang.kondisi.baik = req.body.baik;
          barang.kondisi.lengkap = req.body.lengkap;
          barang.statusBarang =  req.body.statusBarang;
          barang.keterangan = req.body.keterangan;
          barang.save(function(err) {
            if (err) throw console.log(err);
            res.json({ success: true, message: 'Data barang berhasil disimpan'});
          });
          
        }
      }
    });

    

    // var slug = slugify(req.body.title);
    


  });
  
  router.get('/barangs', function(req, res){
    Barang.find({}).populate('kategori lokasi statusBarang').exec(function(err, barangs) {
      if (err) {
        res.json(err);
      } else {
        // console.log(barangs);
        res.json(barangs);
      }
    });
  });

  router.get('/barang/:_id', function(req, res) {
    var _id = req.params._id;
    Barang.findOne({_id: _id}).populate('kategori lokasi statusBarang').exec(function(err, brg) {
      if (err) {
        console.log(err);
      } else {
        res.json(brg);
      }
      
    });
  });

  router.post('/updBarang', function(req, res, file) {
    upload(req, res, function(err, update) {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          res.json({ success: false, message: 'Ukuran gambar terlalu besar. Max 10MB'});
        } else if(err.code === 'filetype') {
          res.json({ success: false, message: 'Gambar haruslah jpeg, jpg, png.' });
        } else {
          console.log(err);
          res.json({ success: false, message: 'Gagal update gambar barang'});
        }
      } else {
        if (!req.file) {
          Barang.findByIdAndUpdate(req.body._id, { $set: {
            namaBarang: req.body.namaBarang,
            kategori: req.body.kategori,
            lokasi: req.body.lokasi,
            spesifikasi: req.body.spesifikasi,
            kondisi: {
              baik : req.body.baik,
              lengkap: req.body.lengkap
            },
            statusBarang: req.body.statusBarang,
            keterangan: req.body.keterangan
            }
          }, function(err, update) {
            if (err) return handleError(err);
            res.json({success: true, message: "Data Barang berhasil diperbarui"});
          });
        } else {
          console.log(req.file.filename);
          Barang.findByIdAndUpdate(req.body._id, { $set: {
            namaBarang: req.body.namaBarang,
            kategori: req.body.kategori,
            lokasi: req.body.lokasi,
            imgBarang: req.file.filename,
            spesifikasi: req.body.spesifikasi,
            kondisi: {
              baik : req.body.baik,
              lengkap: req.body.lengkap
            },
            statusBarang: req.body.statusBarang,
            keterangan: req.body.keterangan
            }
          }, function(err, update) {
            if (err) return handleError(err);
            res.json({success: true, message: "Data Barang berhasil diperbarui dengan gambar"});
          });
        }
      }
    });
  });


  router.delete('/barang/:_id', function(req, res) {
    var id = req.params._id;
    Barang.findOneAndRemove({_id: id}, function(err, barang) {
      if(err) {
        res.json({success: failed, message: "Gagal menghapus "+id+" Ket: "+err});
      } else {
        res.json({ success: true, message: "Sukses Menghapus "+id+"."});
      }
    });
    
  });

  return router;
}
