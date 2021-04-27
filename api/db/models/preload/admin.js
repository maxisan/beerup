require('dotenv').config()
const { User } = require('../../db')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const preloadAdmin = () => {
  return User.create({
    firstName: 'Admin',
    lastName: 'BeerUp',
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: 'admin',
  })
    .then(newUser => {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          newUser.save();
        })
      });
    })
    .then(() => console.log('Admin created successfully'))
    .catch(error => console.log(error));
}

module.exports = preloadAdmin