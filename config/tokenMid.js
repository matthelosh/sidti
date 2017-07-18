var jwt		= require('jsonwebtoken'),
	secrets = require('./secrets');

module.exports = function(req, res, next){
	var token = req.headers['x-access-token'];

	if(token){
		jwt.verify(token, secrets.sessionSecret, function(err, decoded){
			if(err){
				return res.json({message: 'Unauthorized Access. Mismatch token.'});
			} else {
				req. decoded = decoded;
				next();
			}
		});
	} else {
		return res.status(403).json({
			message: 'Unauthorized Access'
		})
	}
};