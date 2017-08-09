var User    = require('../models/user');
var jwt     = require('jsonwebtoken');
var slugify = require('slugify');
// var Post    = require('../models/blog');
var Barang  = require('../models/barang');
var Penunjang = require('../models/penunjang')(Penunjang);
var secret  = 'culip2511';

module.exports = function(router){
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
    User.findOne({ username: req.body.username}).select('email username password realname isAdmin').exec(function(err,user){
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
          var token = jwt.sign({ username: user.username, realname: user.realname, email: user.email, isAdmin: user.isAdmin }, secret, { expiresIn: '10h'} );
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
  router.post('/barang', function(req, res){
    // console.log(req.body);
    // var slug = slugify(req.body.title);
    var barang = new Barang();
    barang._id = req.body._id;
    barang.namaBarang = req.body.namaBarang;
    barang.kategori = req.body.kategori;
    barang.lokasi = req.body.lokasi;
    barang.spesifikasi = req.body.spesifikasi;
    // barang.imgBarang = req.body.imgBarang;
    barang.statusBarang = req.body.statusBarang;
    barang.kondisi = req.body.kondisi;
    barang.keterangan = req.body.keterangan;
    barang.save(function(err){
      if(err){
        // res.send(err);
        // console.log(err.code);
        var errCode = err.code;
        var errMsg = err.message;
        res.json({ success: false, msg: "Barang dengan kode "+ barang._id + " sudah ada." });
      }else{
        // console.log(barang);
        res.json({success: true, message: barang.namaBarang + ' berhasil disimpan'});
      }
    });


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

  return router;
}
