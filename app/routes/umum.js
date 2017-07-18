var Post = require('../models/blog');
var secrets = require('./../../config/secrets');
var path = require('path');
module.exports = function(router){
	router.get('/:id', function(req, res){
	var s = req.params.id;
	if(s){
		if(s == secrets.sessionSecret){
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
		}else{
			res.sendFile(path.resolve('./public/app/views/index.html'));
		}
		
  }else{
  	res.send('Cannot direct access to this route');
  }
    
  	});

  	router.get('/baca/:slug', function(req, res){
  		Post.find({slug: req.params.slug}, function(err, post){
  			if (err) throw err;

  			res.json(post);
  			// console.log(post);
  		});
  	});
	return router;
}