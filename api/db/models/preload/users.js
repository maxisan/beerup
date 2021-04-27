const { User } = require('../../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const users = [
  {
    email: "michael.lawson@reqres.in",
    password: 1234,
    firstName: "Michael",
    lastName: "Lawson",
    profilePicture: "https://reqres.in/img/faces/7-image.jpg"
  },
  {
    email: "lindsay.ferguson@reqres.in",
    password: 1234,
    firstName: "Lindsay",
    lastName: "Ferguson",
    profilePicture: "https://reqres.in/img/faces/8-image.jpg"
  },
  {
    password: 1234,
    email: "tobias.funke@reqres.in",
    firstName: "Tobias",
    lastName: "Funke",
    profilePicture: "https://reqres.in/img/faces/9-image.jpg"
  },
  {
    password: 1234,
    email: "byron.fields@reqres.in",
    firstName: "Byron",
    lastName: "Fields",
    profilePicture: "https://reqres.in/img/faces/10-image.jpg"
  },
  {
    password: 1234,
    email: "george.edwards@reqres.in",
    firstName: "George",
    lastName: "Edwards",
    profilePicture: "https://reqres.in/img/faces/11-image.jpg"
  },
  {
    password: 1234,
    email: "rachel.howell@reqres.in",
    firstName: "Rachel",
    lastName: "Howell",
    profilePicture: "https://reqres.in/img/faces/12-image.jpg"
  }
];

const usersPreload = () => {
  const userCreate = users.map(u => {
    User.create(u)
      .then(newUser => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save();
          })
        });
      })
  });
  return Promise.all(userCreate)
    .then(() => console.log('Users created successfully'))
    .catch(error => console.log(error));
}

module.exports = usersPreload;