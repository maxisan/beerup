const { Meetup, User } = require('../../db/db');

const getAll = () => {
  return Meetup.findAll({
    order: ['date'],
    include: {
      model: User,
      attributes: ["id", "firstName", "lastName", "email", "profilePicture",]
    }
  });
}

const getById = (id) => {
  return Meetup.findOne({
    where: { id },
    include: {
      model: User,
      attributes: ["id", "firstName", "lastName", "email", "profilePicture",]
    }
  });
}

const create = meetup => {
  return Meetup.create(meetup)
}

const editById = (id, newMeetup) => {
  return Meetup.findByPk(id)
    .then(editedMeetup => {
      for (let attrib in newMeetup) {
        editedMeetup[attrib] = newMeetup[attrib];
      }
      editedMeetup.save();
    })
}

const deleteById = id => {
  return Meetup.findByPk(id)
    .then(toDeleteMeetup => {
      toDeleteMeetup.destroy()
    })
}

module.exports = {
  getAll,
  getById,
  create,
  editById,
  deleteById,
}