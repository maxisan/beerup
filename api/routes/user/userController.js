const { User, Guestmeetup, Meetup } = require('../../db/db')
const bcrypt = require('bcrypt');
const saltRounds = 10;


const getAll = () => {
  return User.findAll();
}

const getById = (id) => {
  return User.findByPk(id);
}

const register = user => {
  return User.findOne({
    where: {
      email: user.email
    }
  })
    .then(findUser => {
      if (findUser) {
        throw new Error('Email already in use')
      }
      User.create(user)
        .then(newUser => {
          bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
              newUser.password = hash;
              newUser.save();
            })
          });
        })
    })
}

const login = login => {
  return User.findOne({
    where: {
      email: login.email,
    },
    include: {
      model: Meetup,
    }
  })
    .then(async findUser => {
      if (findUser && findUser.state === 'active') {
        const result = await bcrypt.compare(login.password, findUser.password);
        if (result) {
          return {
            id: findUser.id,
            firstName: findUser.firstName,
            lastName: findUser.lastName,
            email: findUser.email,
            profilePicture: findUser.profilePicture,
            role: findUser.role,
            meetups: findUser.meetups
          }
        }
      }
      throw new Error('wrong username or password')
    })
}

const registerUserInMeetup = (userId, meetupId) => {
  return Guestmeetup.create({
    userId,
    meetupId
  })
}

const removeUserFromMeetup = (userId, meetupId) => {
  return Guestmeetup.findOne({
    where: {
      userId,
      meetupId
    }
  })
    .then(guest => guest.destroy())
}

const updateById = (id, user) => {
  return User.findByPk(id)
    .then(u => {
      for (let attrib in user) {
        u[attrib] = user[attrib]
      }
      u.save()
    })
}

const deactivateById = (id) => {
  return User.findByPk(id)
    .then(u => {
      u.state = 'inactive';
      u.save()
    })
}

const deleteById = (id) => {
  return User.findByPk(id)
    .then(u => {
      u.destroy();
    })
}

module.exports = {
  getAll,
  getById,
  registerUserInMeetup,
  register,
  login,
  updateById,
  deactivateById,
  deleteById,
  removeUserFromMeetup,
}