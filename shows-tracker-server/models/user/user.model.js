const mongoose = require('mongoose');
const _        = require('underscore');

const UserSchema = require('./user.schema');
const User = mongoose.model('User', UserSchema);

module.exports = {
  createUser,
  addShows,
  removeShows,
};

function createUser(user) {
  return User.create(user);
}

function addShows(user, shows) {
  user.trackedShows = _.uniq([...user.trackedShows, ...shows], false, show => show.id);

  return user.save();
}

function removeShows(user, shows) {
  showIdsToRemove = _.map(shows, show => show.id);
  user.trackedShows = _.reject(trackedShows, show => showIdsToRemove.includes(show.id));

  return user.save();
}

function updateSeenEpisodes(user, showId, episodes, watched) {
  const showIndex = user.trackedShows.findIndex(show => show._id === showId);
  const show = this.trackedShows[showIndex];

  if (watched) {
    show.seenEpisodes = _.uniq([...show.seenEpisodes, ...episodes]);
  } else {
    show.seenEpisodes = _.without(show.seenEpisodes, episodes);
  }
  
  return user.save();
}
