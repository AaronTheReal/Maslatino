


// SpotifyController.js

import axios from 'axios';
import dotenv from 'dotenv';
import Noticia from '../models/Noticias.js'; // asegúrate de importar el modelo


dotenv.config();

class noticiasController {

  
async getAllNoticias(req, res, next) {
  try {
    const noticias = await Noticia.find({}).sort({ createdAt: -1 }).limit(10); // solo las más recientes
    res.status(200).json(noticias);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener noticias' });
  }
}



  async createNoticia(req, res, next) {
    console.log(req.body)
    try {
      // Extraer datos del body
      const {
        title,
        summary,
        categories,
        tags,
        location,
        content,
        publishAt, // si usas publicación programada más adelante
        // author: podrías aceptar desde body temporalmente, pero mejor extraer de req.user
      } = req.body;

      // Validación mínima:
      if (!title) {
        return res.status(400).json({ message: 'El campo title es obligatorio.' });
      }
      // Aquí podrías validar que content sea un array y cada elemento tenga estructura válida.
      if (!Array.isArray(content)) {
        return res.status(400).json({ message: 'El campo content debe ser un array de bloques.' });
      }

      // Obtener author:
      let authorId;
      if (req.user && req.user.id) {
        authorId = req.user.id;
      } else if (req.body.author) {
        authorId = req.body.author; // temporal
      } else {
        return res.status(400).json({ message: 'No se proporcionó author.' });
      }

      // Construir objeto de noticia:
      const nuevaNoticia = new Noticia({
        title,
        summary,
        author: authorId,
        categories: Array.isArray(categories) ? categories : (typeof categories === 'string' ? categories.split(',').map(s=>s.trim()) : []),
        tags: Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',').map(s=>s.trim()) : []),
        location: location || {},
        content,
        // createdAt por defecto, updatedAt por pre-save
      });

      // Si manejas publicación futura, podrías guardar publishAt en el esquema y controlar visibilidad.
      // Aquí no se guarda, pero si tu NoticiaSchema incluyera publishAt, lo harías:
      // if (publishAt) nuevaNoticia.publishAt = new Date(publishAt);

      const saved = await nuevaNoticia.save();
      return res.status(201).json(saved);
    } catch (error) {
      console.error('Error en createNoticia:', error);
      // Si es un error de validación de mongoose, puedes enviar 400:
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: error.message });
      }
      next(error);
    }
  }
}

const NoticiasController = new noticiasController();
export default NoticiasController;
