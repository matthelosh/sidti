var mongoose 	= require('mongoose'),
	Schema		= mongoose.Schema;

var commentSchema = Schema({
	user 	: {
		type: String,
		default: 'Anonymous'
	},
	comment  : {
		type: String,
	},
	commentDate: {
		type: Date,
		default: Date.now
	}

});

module.exports = mongoose.model('Comment', commentSchema);