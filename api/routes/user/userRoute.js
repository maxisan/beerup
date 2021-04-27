const express = require('express');
const router = express.Router();
const controller = require('./userController');
const passport = require('passport')


/* GET */

router.get('/auth', (req, res, next) => {
  if (req.user) {
    return res.json(req.user);
  }
  res.status(401).json({});
})

router.get('/logout', (req, res, next) => {
  req.logOut();
  res.json({});
})

router.get('/', (req, res, next) => {
  controller.getAll()
    .then(r => res.json(r))
    .catch(next)
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  controller.getById(id)
    .then(r => res.json(r))
    .catch(next)
})

/* POST */

router.post('/', (req, res, next) => {
  const { user } = req.body;
  controller.register(user)
    .then(r => res.json(r))
    .catch(err => {
      if (err.message == 'Email already in use' ) {
        return res.status(400).send({error: err})
      }
      next(err);
    });
})

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  if (!req.user) return res.status(400).json({error: 'username or password incorrect'});
  res.json(req.user);
})

router.post('/:userId/meetup/:meetupId', (req, res, next) => {
  const {userId, meetupId} = req.params;
  controller.registerUserInMeetup(userId, meetupId)
    .then(r => res.json(r))
    .catch(next);
})

/* PUT */

router.put('/deactivate/:id', (req, res, next) => {
  const { id } = req.params;
  controller.deactivateById(id)
    .then(r => res.send(r))
    .catch(next);
})

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { user } = req.body
  controller.updateById(id, user)
    .then(r => res.send(r))
    .catch(next);
})

/* DELETE */

router.delete('/:userId/meetup/:meetupId', (req, res, next) => {
  const {userId, meetupId} = req.params;
  controller.removeUserFromMeetup(userId, meetupId)
    .then(r => res.json(r))
    .catch(next);
})


router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  controller.deleteById(id)
    .then(r => res.send(r))
    .catch(next)
})

module.exports = router;
