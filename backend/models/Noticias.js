import mongoose from 'mongoose';

const NoticiaSchema = new mongoose.Schema({

    

  addedAt: { type: Date, default: Date.now }

});

export default mongoose.model('Noticia', NoticiatSchema);
