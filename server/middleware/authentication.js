const User = require('../models').user;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: process.env.APP_JWT_SECRET
};

module.exports = {

  getHashFromPassword: function (password) {
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash;
  },

  init: function (app, passport, express) {
    const strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
      next(null, { email: jwt_payload.email });
    });

    passport.use(strategy);

    app.post("/login", function (req, res) {
      if (req.body.email && req.body.password) {
        const email = req.body.email.toLowerCase();
        const password = req.body.password;
        User.findOne({
          where: {
            email: email
          }
        }).then((util) => {
          if (util && bcrypt.compareSync(password, util.hash_password)) {
            const payload = {
              user: {
                id: util.id,
                email: util.email,
                nickname: util.nickname
              }
            };
            const token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({ message: "ok", token: token, user: util });
          }
          else {
            res.status(400).send("LOGIN INCORRECT");
          }
        }).catch((error) => res.status(400).send(error));
      }
      else {
        res.status(400).send("MISSING EMAIL PASSWORD");
      }
    }
    );

  }
}