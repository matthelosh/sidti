var mongoose = require('mongoose'),
	// slugify	= require('slugify'),
	Schema = mongoose.Schema;

var blogSchema = new Schema({
	title: {type: String, required: true, unique: true},
	slug: {type: String, unique: true},
	tag: {type: String, enum:['PAI', 'BLANKON', 'MEAN']},
	content: {type: String},
	posted: {type: Date, default: Date.now},
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	comments: [{body: "string", by: "string"}]
});

// blogSchema.pre('save', function(next){
// 	var blog = this;
// 	slugify(blog.title, function(err, slug){
// 		if(err) return next(err);
// 		blog.slug = slug;
// 		next();
// 	});
// });

module.exports = mongoose.model("Post", blogSchema, 'blog');