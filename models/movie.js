import mongoose from 'mongoose'

export {
  Movie
}

const movieSchema = new mongoose.Schema({
  title: {type: String, required: true},
  backdrop_path: String,
  poster_path: String,
  release_date: Date,
  api_id: Number,
  added_by: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
});

const Movie = mongoose.model('Movie', movieSchema);