


// SpotifyController.js

import axios from 'axios';
import dotenv from 'dotenv';
import Noticia from '../models/Noticias.js'; // asegúrate de importar el modelo
import Category from '../models/Categorias.js';


dotenv.config();

class noticiasController {


    async getNoticiaDespliegue(req,res,next ){
  try {
    const noticiaId = req.body.noticia || [];

    if (!Array.isArray(noticiaId) || noticiaId.length === 0) {
      return res.status(400).json({ error: 'Debes proporcionar al menos una categoría.' });
    }


    // 4. Consulta filtrando por categorías
    const noticia = await Noticia.find({
      _id: noticiaId
    })
    res.status(200).json(noticia);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener noticias por categoría' });
  }
    }


 async getNoticiaCategorias(req, res, next) {
  try {
    const nombresCategorias = req.body.categorias || [];

    console.log('Nombres recibidos:', nombresCategorias);

    if (!Array.isArray(nombresCategorias) || nombresCategorias.length === 0) {
      return res.status(400).json({ error: 'Debes proporcionar al menos una categoría.' });
    }

    // 1. Busca los _id correspondientes a los nombres
    const categorias = await Category.find({
      name: { $in: nombresCategorias }
    }).select('_id');

    const idsCategorias = categorias.map(cat => cat._id);

    if (idsCategorias.length === 0) {
      return res.status(404).json({ error: 'Ninguna categoría encontrada.' });
    }

    const limite = parseInt(req.body.limite) || 10;

    // 2. Buscar noticias filtradas por ObjectId en categories[]
    const noticias = await Noticia.find({
      categories: { $in: idsCategorias }
    })
      .sort({ createdAt: -1 })
      .limit(limite);

    res.status(200).json(noticias);
  } catch (e) {
    console.error('Error en getNoticiaCategorias:', e);
    res.status(500).json({ error: 'Error al obtener noticias por categoría' });
  }
}

  
async getAllNoticias(req, res, next) {
  try {
    const noticias = await Noticia.find({})  //.sort({ createdAt: -1 }).limit(10); // solo las más recientes
    res.status(200).json(noticias);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener noticias' });
  }
}



  async createNoticia(req, res, next) {
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
