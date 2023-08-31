import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: String,
  mobile:String,
  roles:[],
  status:String,
  deletedOn: Date,

});

// Before saving the user, hash the password
userSchema.pre('save', function(next) {
  const user:any = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, function(error, hash) {
      if (error) { return next(error); }
      user.password = hash;
      next();
    });
  });
});

// userSchema.pre('findOneAndUpdate', function(next) {
//   const user = this;
//   if (!user.isModified('password')) { return next(); }
//   bcrypt.genSalt(10, function(err, salt) {
//     if (err) { return next(err); }
//     bcrypt.hash(user.password, salt, function(error, hash) {
//       if (error) { return next(error); }
//       user.password = hash;
//       next();
//     });
//   });
// });


userSchema.methods.comparePassword = function(candidatePassword, callback) {
  let user:any = this;
  bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: function(doc:any, ret:any, options:any) {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model('User', userSchema);

export default User;
