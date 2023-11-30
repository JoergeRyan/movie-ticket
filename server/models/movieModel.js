const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    duration: {
      type: Number,
    },
    genre: {
      type: String,
    },
    language: {
      type: String,
    },
    releaseDate: {
      type: Date,
    },
    poster: {
      type: String,
    },
  },
  { timestamps: true }
);



module.exports = mongoose.model("movies", movieSchema);


