import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

// 1. Sub-esquema de bloque de contenido:
const BlockSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['text', 'image', 'quote', 'link', 'list']
  },
  // Campos para bloque de texto:
  text: { type: String },            // contenido textual
  tag: {                              // etiqueta semántica, p.ej. 'p', 'h1', 'h2', ...
    type: String,
    enum: ['p','h1','h2','h3','h4','h5','h6','span'],
    default: 'p'
  },
  style: {                           // opcional: estilos inline o metadatos
    fontSize: String,                // ej. '16px' o '1rem'; puede interpretarse en frontend
    fontWeight: String,              // ej. 'bold', '400'
    fontFamily: String               // opcional
  },

  // Campos para bloque de imagen:
  url: { type: String },            // URL o path de la imagen
  alt: { type: String },            // texto alternativo
  caption: { type: String },        // pie de foto, opcional

  // Campos para enlace:
  href: { type: String },           // URL destino
  textLink: { type: String },       // texto del enlace

  // Campos para lista:
  items: [{ type: String }],        // array de elementos de lista
  ordered: { type: Boolean },       // true => <ol>, false => <ul>

  // Campos para cita / frase destacada:
  quote: { type: String },          // texto de la cita
  authorQuote: { type: String },    // autor o fuente de la cita
}, 
//{ _id: true, timestamps: false }
);

// Validación personalizada para asegurar campos según tipo
BlockSchema.pre('validate', function(next) {
  // `this` es el bloque
  switch (this.type) {
    case 'text':
      if (!this.text) {
        return next(new Error('Bloque de tipo text requiere campo text.'));
      }
      break;
    case 'image':
      if (!this.url) {
        return next(new Error('Bloque de tipo image requiere campo url.'));
      }
      break;
    case 'link':
      if (!this.href || !this.textLink) {
        return next(new Error('Bloque de tipo link requiere href y textLink.'));
      }
      break;
    case 'list':
      if (!Array.isArray(this.items) || this.items.length === 0) {
        return next(new Error('Bloque de tipo list requiere items no vacío.'));
      }
      // ordered puede omitirse (se interpreta false si no está) o debe ser Boolean
      break;
    case 'quote':
      if (!this.quote) {
        return next(new Error('Bloque de tipo quote requiere quote.'));
      }
      break;
    default:
      // nunca debería ocurrir, pues enum limita a los valores permitidos
      break;
  }
  next();
});

// 2. Esquema principal de Noticia:
const NoticiaSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  summary: {
    type: String,
    trim: true
  },
  author: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  categories: [{
    type: String,
    trim: true
    // Alternativa: ref: 'Category' si tienes colección separada
  }],
  tags: [{
    type: String,
    trim: true
  }],
  // Ubicación: opción sencilla:
  location: {
    country: { type: String, trim: true },
    region: { type: String, trim: true },
    city: { type: String, trim: true }
  },
  // Si en el futuro quieres geolocalización real (búsquedas 2dsphere), podrías usar:
  // locationGeo: {
  //   type: { type: String, enum: ['Point'], default: 'Point' },
  //   coordinates: { type: [Number] } // [lng, lat]
  // }
  content: {
    type: [BlockSchema],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hook para actualizar updatedAt automáticamente
NoticiaSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Si usarás geolocalización real, definir índice 2dsphere en locationGeo:
// NoticiaSchema.index({ locationGeo: '2dsphere' });

export default model('Noticia', NoticiaSchema);
