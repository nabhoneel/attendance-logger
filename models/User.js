const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  email: String,
  name: String,
  going: Number,
  notGoing: Number,
  undecided: Number
});

const User = mongoose.model('users', userSchema);

module.exports = User;

module.exports.signIn = async (profile, done) => {
  const existingUser = await User.findOne({googleID: profile.id});
  
  if(existingUser) {
    require('./Attendance').updateDailyLog(null, null);
    return done(null, existingUser);
  } else {
    const newUser = await new User({
      googleID: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      going: 0,
      notGoing: 0,
      undecided: 0
    }).save();

    require('./Attendance').updateDailyLog(profile.id, null);
    done(null, newUser);
  }
}

module.exports.markGoing = async (googleID) => {
  console.log(
    await User.findOneAndUpdate(
    { googleID: googleID },
    { $inc: { going: 1 }})
  );
}

module.exports.unmarkGoing = async (googleID) => {
  console.log(
    await User.findOneAndUpdate(
    { googleID: googleID },
    { $inc: { going: -1 }})
  );
}

module.exports.markNotGoing = async (googleID) => {
  console.log(
    await User.findOneAndUpdate(
    { googleID: googleID },
    { $inc: { notGoing: 1 }})
  );
}

module.exports.unmarkNotGoing = async (googleID) => {
  console.log(
    await User.findOneAndUpdate(
    { googleID: googleID },
    { $inc: { notGoing: -1 }})
  );
}

module.exports.markUndecided = async (googleID) => {
  console.log(
    await User.findOneAndUpdate(
    { googleID: googleID },
    { $inc: { undecided: 1 }})
  );
}

module.exports.unmarkUndecided = async (googleID) => {
  console.log(
    await User.findOneAndUpdate(
    { googleID: googleID },
    { $inc: { undecided: -1 }})
  );
}