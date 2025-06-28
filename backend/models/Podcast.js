import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

const PodcastSchema = new Schema({
  spotifyId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // carátula del episodio
  url: { type: String },    // enlace a Spotify
  embedUrl: { type: String }, // link embed iframe (precalculado)
  duration: { type: Number }, // en segundos (opcional)
  releaseDate: { type: Date }, // fecha de publicación real

  // Relación opcional con un autor (creador interno)
  author: { type: Types.ObjectId, ref: 'User' },
  authorName: { type: String },

  // Compatibles con sistema de filtrado del usuario
  categories: [{
    type: String,
    enum: ['Mundo', 'Arte', 'Política', 'Finanzas', 'Familia', 'Deportes', 'Salud'],
    required: true
  }],
  tags: [{ type: String, trim: true }],
  language: {
    type: String,
    enum: ['es', 'en', 'fr', 'pt'],
    default: 'es'
  },

  meta: {
    description: { type: String },
    image: { type: String } // carátula alternativa o específica
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Autogenerar embedUrl si falta
PodcastSchema.pre('save', function (next) {
  if (this.spotifyId && !this.embedUrl) {
    this.embedUrl = `https://open.spotify.com/embed/episode/${this.spotifyId}`;
  }
  this.updatedAt = Date.now();
  next();
});

export default model('Podcast', PodcastSchema);
