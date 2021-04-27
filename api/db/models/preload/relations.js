const { Guestmeetup } = require('../../db');

const relationsPreload = () => {
  let create = [];
  for ( let i = 1; i <= 6 ; i++) {
    for (let j = Math.ceil(Math.random() * 6); j <= 6; j++) {
      create.push(Guestmeetup.create({
        meetupId: i,
        userId: j,
      }))
    }
  }
  Promise.all(create)
    .then(() => console.log('Relations created successfully'))
    .catch(error => console.log(error));
}

module.exports = relationsPreload;