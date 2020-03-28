
module.exports = {
  init(passport) {
    passport.serializeUser(function (user, done) {
      console.log("serialize User");
      done(null, user);
    });

    passport.deserializeUser(function (user, done) {
      console.log("deserialize User");
      done(null, user);
    });
  }
}