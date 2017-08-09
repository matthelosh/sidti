var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    titlize = require('mongoose-title-case'),
    validate = require('mongoose-validator'),
    Schema   = mongoose.Schema;


var nameValidator = [
  validate({
    validator: 'matches',
    arguments: /^([a-zA-Z ]{3,30})+$/,
    message: 'Nama tidak boleh kurang dari 3, atau lebih dari 30 huruf.'
  })
];


var usernameValidator = [
   validate({
    validator: 'isLength',
    arguments: [3, 25],
    message: 'Email harus berjumlah di antara {ARGS[0]} dan {ARGS[1]} karakter.'
  }),
  validate({
    validator: 'isAlphanumeric',
    message:"Username hanya boleh terdiri dari Huruf dan Angka."
  })
];

var emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Email tidak valid'
  }),
  validate({
    validator: 'isLength',
    arguments: [3, 25],
    message: 'Email harus berjumlah di antara {ARGS[0]} dan {ARGS[1]} karakter.'
  })
];

var UserSchema = new Schema({
  username: { type: String, lowercase: true, required: true, unique: true, validate:  usernameValidator },
  realname: { type: String, required: true, validate: nameValidator},
  password: { type: String, required: true},
  email: { type: String, required: true, lowercase: true, unique: true, validate: emailValidator },
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