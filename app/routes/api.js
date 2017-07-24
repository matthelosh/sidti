var User    = require('../models/user');
var jwt     = require('jsonwebtoken');
var slugify = require('slugify');
var Post    = require('../models/blog');
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
    User.findOne({ username: req.body.username}).select('email username password').exec(function(err,user){
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
          var token = jwt.sign({ username: user.username, realname: user.realname, email: user.email }, secret, { expiresIn: '24h'} );
          res.json({success: true, message: 'Pengguna boleh masuk. Tebentar . .', token: token});
        }
      }
    });
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

  router.get('/posts', function(req, res){
    Post
      .find()
      .then(
        function(posts){
          res.json(posts);
          // console.log(posts);
        },
        function(err){
          res.sendStatus(400);
          console.log(err);
        }
      )
  });

  router.get('/baca/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    Post
      .find({'slug': id})
      .then(
        function(post){
          console.log(post);
          res.json(post);
        },
        function(err){
          res.sendStatus(400);
          console.log(err);
        }
      )
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

  router.post('/postComment/:slug', function(req, res){
    var slug = req.params.slug;
    var comEmail = req.body.email;
    var comBody  = req.body.body;

    Post.findOneAndUpdate({slug:slug}, {
      "$push":{
        comments: {by: comEmail, body: comBody}
      }
    }, {
      new: true
    })
    .exec(function(err, done){
      if (err) {
        res.status(400).send({msg: 'Gagal menambah komen'});
      }
      return res.status(200).send(done);
    });
  });

  router.get('/getComments/:slug', function(req, res){
    var slug = req.params.slug;

    Post.find({"slug": slug})
        .select('comments')
        .exec(function(err, comments){
          if (err) return next (err);
          res.status(200).send(comments);
        });
  });

// API untuk Inventaris
  // router.post('/barang', function(req, res){
  //   var barang = new Barang();
  //   barang._id = req.body._id;
  //   barang.namaBarang = req.body.namaBarang;
  //   if(barang._id == null || barang._id == "" || req.body.namaBarang == "" || req.body.namaBarang == null){
  //     res.send('ID Barang atau nama barang harus diisi');
  //   } else {
  //     barang.save(function(err){
  //       if (err){
  //         res.send(err);
  //       }else{
  //         res.send('Barang berhasil disimpan');
  //       }
  //     });
  //   }
  // });
  
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
