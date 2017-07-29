var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    titlize = require('mongoose-title-case'),
    validate = require('mongoose-validator'),
    Schema   = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, lowercase: true, required: true, unique: true },
  realname: { type: String, required: true},
  password: { type: String, required: true},
  email: { type: String, required: true, lowercase: true, unique: true },
  isAdmin: {type: Boolean, default: false}
});

UserSchema.pre('save', function(next){
  var user = this;
  bcrypt.hash(user.password, null, null, function(err, hash){
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.plugin(titlize, {
  paths: ['realname']
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);