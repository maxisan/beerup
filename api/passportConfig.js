const { User, Meetup } = require('./db/db')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      User.findOne({
        where: {
          email,
        },
        include: [Meetup],
      })
        .then(async user => {
          if (!user) return done(null, false);
          const result = await bcrypt.compare(password, user.password);
          if (!result) {
            return done(null, false);
          }
          return done(null, user);
        })
      .catch(error => {throw error})
    })    
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      where: {
        id,
      },
      include: [Meetup],
    })
      .then(u => {
        done(null, u);
      })
      .catch(error => {throw error});
  });
}