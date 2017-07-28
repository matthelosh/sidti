var User    = require('../models/user');
var jwt     = require('jsonwebtoken');
var slugify = require('slugify');
// var Post    = require('../models/blog');
var Barang  = require('../models/barang');
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
          res.json({ success: false, message:'Username or Email already exists' });
        }else{
          res.json({ success: true, message:'User created' });
        }
      });
    }

  });

// Login Route
  router.post('/authenticate', function(req, res){
    User.findOne({ username: req.body.username}).select('email username password realname').exec(function(err,user){
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
          var token = jwt.sign({ username: user.username, realname: user.realname, email: user.email }, secret, { expiresIn: '10h'} );
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
    barang.imgBarang = req.body.imgBarang;
    barang.statusBarang = req.body.statusBarang;
    barang.kondisi = req.body.kondisi;
    barang.keterangan = req.body.keterangan;
    barang.save(function(err){
      if(err){
        res.send(err);
      }else{
        res.json(barang);
      }
    });


  });
  
  router.get('/barang', function(req, res){
    Barang.find({}, function(err, barangs){
      if (err){
        res.send(err);
      } else {
        res.json(barangs);
      }
    });
  });

  return router;
}
