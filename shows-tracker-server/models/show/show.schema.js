const mongoose = require("mongoose");

const ShowSchema = new mongoose.Schema({
  name: String,
  image: String,
  status: String,
  type: String,
  summary: String,
  region: String,
  seenEpisodes: { type: [Number], default: [] },
  }, {
    timestamps: true,
  });

module.exports = ShowSchema;
