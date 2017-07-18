var User    = require('../models/user');
var slugify = require('slugify');
var Post    = require('../models/blog');
module.exports = function(router){
  router.post('/users', function(req, res){
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email    = req.body.email;
    if (req.body.username == null || req.body.username == "" || req.body.password == '' || req.body.email == '' ) {
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

  // router.get('/', function(req, res){
  //   res.send('Route API');
  // });

  router.get('/getUsers', function(req, res){
    User.find({}, function(err, users){
      if(err) throw err;
      else{
        console.log(users);
        res.send(users);
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

  router.post('/post', function(req, res){
    // console.log(req.body);
    var slug = slugify(req.body.title);
    var post = new Post();
    post.title = req.body.title;
    post.slug = slug;
    post.content = req.body.content;
    post.save(function(err){
      if(err){
        res.send(err);
      }else{
        res.json(slug);
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

  

  return router;
}
