import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

// Subdocumento para cada episodio
const EpisodeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  audioUrl: { type: String, required: true }, // Ruta del archivo .mp3 u otro
  image: { type: String }, // Imagen específica del episodio
  duration: { type: Number }, // en segundos
  releaseDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

const PodcastSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  coverImage: { type: String }, // Imagen principal del podcast (carátula)
  language: {
    type: String,
    enum: [
      'es', 'es-MX', 'es-AR', 'es-BO', 'es-CL', 'es-CO', 'es-CR', 'es-CU', 'es-DO',
      'es-EC', 'es-SV', 'es-GT', 'es-HN', 'es-NI', 'es-PA', 'es-PY', 'es-PE', 'es-PR',
      'es-UY', 'es-VE', 'pt', 'pt-BR', 'fr', 'en-US', 'en-GB', 'en-CA'
    ],
    default: 'es'
  },

  // Lista de episodios
  episodes: [EpisodeSchema],

  // Autor interno (si aplica)
  author: { type: Types.ObjectId, ref: 'User' },
  authorName: { type: String },

  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }],
  tags: [{ type: String, trim: true }],

  meta: {
    description: { type: String },
    image: { type: String } // Imagen alternativa para SEO
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Actualizar updatedAt antes de guardar
PodcastSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default model('Podcast', PodcastSchema);
