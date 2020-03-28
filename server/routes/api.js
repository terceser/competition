const express = require('express');
const router = express.Router();

const usersAPI = require('../api').users;
const roundsAPI = require('../api').rounds;
const triggersAPI = require('../api').triggers;

//REST API FOR USERS
router.get('/users', usersAPI.list);
router.get('/users/:id', usersAPI.retrieve);

//REST API FOR TRIGGERS
router.post("/rounds/:idRound/triggers", triggersAPI.addTrigger);

//REST API FOR ROUNDS
router.get('/rounds', roundsAPI.list);
router.post('/rounds', roundsAPI.create);
router.get('/rounds/:id', roundsAPI.retrieve);
router.put('/rounds/:id', roundsAPI.update);


/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;