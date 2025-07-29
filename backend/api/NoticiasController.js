


// SpotifyController.js

import axios from 'axios';
import dotenv from 'dotenv';
import Noticia from '../models/Noticias.js'; // asegúrate de importar el modelo
import Category from '../models/Categorias.js';
import { recacheNoticia } from '../utils/prerender-service.js';


dotenv.config();

class noticiasController {
 async obtenerNoticiasPorCategoriaId(req, res) {
  try {
    const categoriaId = req.params.id;

    // Buscar todas las noticias con esa categoría
    const noticias = await Noticia.find({ categories: categoriaId }).sort({ createdAt: -1 });

    res.json(noticias);
  } catch (error) {
    console.error('Error al obtener noticias por categoría ID:', error);
    res.status(500).json({ message: 'Error al obtener noticias por categoría' });
  }
}

async getNoticiasRecientes(req, res, next) {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 5, 20);

    const noticias = await Noticia.find(
      {},
      'title slug createdAt meta.image' // solo campos necesarios para sidebar
    )
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    res.status(200).json(noticias);
  } catch (e) {
    console.error('Error en getNoticiasRecientes:', e);
    res.status(500).json({ error: 'Error al obtener noticias recientes' });
  }
}

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
      } = req.body;

      console.log("noticias", req.body);
      // Validación mínima
      if (!title) {
        return res.status(400).json({ message: 'El campo title es obligatorio.' });
      }

      if (!Array.isArray(content)) {
        return res.status(400).json({ message: 'El campo content debe ser un array de bloques.' });
      }

      // Obtener author
      let authorId;
      if (req.user && req.user.id) {
        authorId = req.user.id;
      } else if (req.body.author) {
        authorId = req.body.author; // Temporal
      } else {
        return res.status(400).json({ message: 'No se proporcionó author.' });
      }

      function generarSlug(texto) {
        return texto
          .toString()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
      // Construir objeto de noticia
      const nuevaNoticia = new Noticia({
        title,
        slug: generarSlug(title), // ✅ slug generado aquí
        summary,
        author: authorId,
        categories: Array.isArray(categories)
          ? categories
          : typeof categories === 'string'
          ? categories.split(',').map((s) => s.trim())
          : [],
        tags: Array.isArray(tags)
          ? tags
          : typeof tags === 'string'
          ? tags.split(',').map((s) => s.trim())
          : [],
        location: location || {},
        content,
      });

      // Guardar en base de datos
      const saved = await nuevaNoticia.save();

      // ⚡️ Notificar a Prerender.io que recachee la URL
      await recacheNoticia(saved.slug);

      // Respuesta al cliente
      return res.status(201).json(saved);
    } catch (error) {
      console.error('Error en createNoticia:', error);

      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: error.message });
      }

      next(error);
    }
  }
}

const NoticiasController = new noticiasController();
export default NoticiasController;
