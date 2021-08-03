import mongoose from 'mongoose'

export {
  Tv
}

const tvSchema = new mongoose.Schema({
  title: {type: String, required: true},
  backdrop_path: String,
  poster_path: String,
  release_date: Date,
  api_id: Number,
  added_by: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
});

const Tv = mongoose.model('Tv', tvSchema);