const express = require('express');
const router = express.Router();
const controller = require('./meetupController');

router.get('/', (req, res, next) => {
  controller.getAll()
    .then(r => res.json(r))
    .catch(next);
})

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  controller.getById(id)
    .then(r => res.json(r))
    .catch(next);
})

router.post('/', (req, res, next) => {
  const { meetup } = req.body
  controller.create(meetup)
    .then(r => res.send(r))
    .catch(next);
})

router.put('/:id', (req, res, next) => {
  const { meetup } = req.body;
  const { id } = req.params;
  controller.editById(id, meetup)
    .then(r => res.send(r))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  controller.deleteById(id)
    .then(r => res.send(r))
    .catch(next)
})

module.exports = router