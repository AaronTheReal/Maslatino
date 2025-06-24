import mongoose from 'mongoose';

const PodcastSchema = new mongoose.Schema({
  spotifyId: { type: String, required: true, unique: true },
  title: String,
  description: String,
  image: String,
  url: String,
  embedUrl: String,
  addedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Podcast', PodcastSchema);
