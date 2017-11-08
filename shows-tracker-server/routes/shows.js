var express = require('express');
var router = express.Router();

const { User, Show } = require('../models/models');
const { loggedIn } = require('../middleware/authenticate');

router.post('/create', (req, res, next) => {
  const user = req.user;
  const shows = req.body.shows;

  User.addShows(user, shows)
    .then(user => res.json({shows: user.trackedShows}))
    .catch(err => res.sendStatus(400));
});

router.delete('/remove', (req, res, next) => {
  const user = req.user;
  const shows = req.body.shows;

  User.removeShows(user, shows)
    .then(user => res.json({shows}))
    .catch(err => res.sendStatus(400));
});

router.patch('/:showId/episodes', (req, res, next) => {
  const user = req.user;
  const showId = Number(req.params.showId);
  const { watched, episodes } = req.body;

  User.updateSeenEpisodes(user, showId, episodes, watched)
    .then(user => res.sendStatus(200))
    .catch(err => res.sendStatus(400));
});

module.exports = router;
