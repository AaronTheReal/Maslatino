import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Usuario from '../models/Usuarios.js';
import Podcast from '../models/Podcast.js'; // asegúrate de importar el modelo
import Show from '../models/Show.js'; // asegúrate de importar el modelo
import Noticia from '../models/Noticias.js'; // asegúrate de importar el modelo

dotenv.config();

class UsuariosController {

  async getUserBack(req,res){
  }

async getAll(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'Falta el ID del usuario.' });
    }

    const user = await Usuario.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    const favoritos = user.favorites;

    const noticias = [];
    const podcasts = [];
    const episodios = [];

    for (const fav of favoritos) {
      const id = fav.contentId;
      const tipo = fav.contentType;

      if (tipo === 'Noticia') {
        const noticia = await Noticia.findById(id).select('_id title meta.image categories');
        if (noticia) noticias.push(noticia);
      } else if (tipo === 'Podcast') {
        const podcast = await Podcast.findById(id).select('_id title coverImage categories');
        if (podcast) podcasts.push(podcast);
      } else if (tipo === 'Episodio') {
        // Buscar el podcast que contiene ese episodio
        const podcast = await Podcast.findOne(
          { 'episodes._id': id },
          {
            _id: 1,
            title: 1,
            coverImage: 1,
            categories: 1,
            episodes: { $elemMatch: { _id: id } },
          }
        ).populate('categories', 'name slug color');

        if (podcast && podcast.episodes.length > 0) {
          const episode = podcast.episodes[0];

          episodios.push({
            _id: episode._id,
            title: episode.title,
            description: episode.description,
            audioUrl: episode.audioUrl,
            image: episode.image,
            duration: episode.duration,
            releaseDate: episode.releaseDate,
            podcastId: podcast._id,
            podcastTitle: podcast.title,
            podcastCoverImage: podcast.coverImage,
            categories: podcast.categories,
          });
        }
      }
    }

    console.log("Episodios", episodios);
    res.status(200).json({
      noticias,
      podcasts,
      episodios
    });

  } catch (err) {
    console.error('Error al obtener favoritos:', err);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}



async getAllByCategory(req, res) {
  try {
    const categoria = decodeURIComponent(req.params.category); // por si hay tildes o espacios

    // Búsqueda en cada colección
    const podcasts = await Podcast.find({ categories: categoria });
    const shows = await Show.find({ categories: categoria });
    const noticias = await Noticia.find({ categories: categoria });

    // Devolver todo junto
    return res.status(200).json({
      podcasts,
      shows,
      noticias
    });
  } catch (error) {
    console.error('Error al obtener contenidos por categoría:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}
async getFavorites(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'Falta el ID del usuario.' });
    }

    const user = await Usuario.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    const favoritos = user.favorites;

    const noticias = [];
    const podcastsMap = new Map();
    const episodios = [];

    for (const fav of favoritos) {
      const id = fav.contentId;
      const tipo = fav.contentType;

      if (tipo === 'Noticia') {
        const noticia = await Noticia.findById(id).select('_id title meta.image categories');
        if (noticia) noticias.push(noticia);
      } else if (tipo === 'Podcast') {
        const podcast = await Podcast.findById(id).select('_id title coverImage categories');
        if (podcast) podcastsMap.set(podcast._id.toString(), podcast);
      } else if (tipo === 'Episodio') {
        const podcast = await Podcast.findOne({ 'episodes._id': id }).select('_id title coverImage categories');
        if (podcast && !podcastsMap.has(podcast._id.toString())) {
          podcastsMap.set(podcast._id.toString(), podcast);
        }

        // Si quieres seguir devolviendo los episodios como lista
        const podWithEp = await Podcast.findOne({ 'episodes._id': id }, { 'episodes.$': 1 });
        if (podWithEp?.episodes?.[0]) {
          const ep = podWithEp.episodes[0].toObject();
          ep.podcastId = podWithEp._id;
          episodios.push(ep);
        }
      }
    }

    const podcasts = Array.from(podcastsMap.values());

    console.log(noticias,podcasts,episodios);
    res.status(200).json({
      noticias,
      podcasts,
      episodios
    });

  } catch (err) {
    console.error('Error al obtener favoritos:', err);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}


/*

async getFavorites(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'Falta el ID del usuario.' });
    }

    const user = await Usuario.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    const favoritos = user.favorites;

    const noticias = [];
    const podcasts = [];
    const episodios = [];

    for (const fav of favoritos) {
      const id = fav.contentId;
      const tipo = fav.contentType;

      if (tipo === 'Noticia') {
        const noticia = await Noticia.findById(id).select('_id title meta.image categories');
        if (noticia) noticias.push(noticia);
      } else if (tipo === 'Podcast') {
        const podcast = await Podcast.findById(id).select('_id title coverImage categories');
        if (podcast) podcasts.push(podcast);
      } else if (tipo === 'Episodio') {
        const podcast = await Podcast.findOne(
          { 'episodes._id': id },
          {
            _id: 1,
            title: 1,
            coverImage: 1,
            categories: 1,
            episodes: { $elemMatch: { _id: id } },
          }
        ).populate('categories', 'name slug color');

        if (podcast && podcast.episodes.length > 0) {
          const episode = podcast.episodes[0];

          episodios.push({
            _id: episode._id,
            title: episode.title,
            description: episode.description,
            audioUrl: episode.audioUrl,
            image: episode.image,
            duration: episode.duration,
            releaseDate: episode.releaseDate,
            podcastId: podcast._id,
            podcastTitle: podcast.title,
            podcastCoverImage: podcast.coverImage,
            categories: podcast.categories,
          });
        }
      }
    }

    res.status(200).json({
      noticias,
      podcasts,
      episodios
    });

  } catch (err) {
    console.error('Error al obtener favoritos:', err);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}
*/


// controllers/user.controller.js

 async checkFavorite(req, res) {
  try {
    const { noticia, Tipo, IdUsuario } = req.body;

    console.log(req.body)

    if (!noticia || !Tipo || !IdUsuario) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    const user = await Usuario.findById(IdUsuario);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const isFav = user.favorites.some(fav =>
      fav.contentId.toString() === noticia && fav.contentType === Tipo
    );

    return res.status(200).json({ isFavorite: isFav });
  } catch (err) {
    console.error('Error al verificar favorito:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}


async  addToFavorite(req, res) {
  try {
    const { noticia, Tipo, IdUsuario } = req.body;

    console.log("si llega?",req.body);
    if (!noticia || !Tipo || !IdUsuario) {
      return res.status(400).json({ error: 'Faltan datos requeridos.' });
    }

    const user = await Usuario.findById(IdUsuario);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Verificar si ya existe ese favorito
    const yaExiste = user.favorites.some(fav =>
      fav.contentId.toString() === noticia &&
      fav.contentType === Tipo
    );

    if (yaExiste) {
      return res.status(409).json({ message: 'Ya está en favoritos.' });
    }

    // Agregar nuevo favorito
    user.favorites.push({
      contentId: noticia,
      contentType: Tipo
    });

    await user.save();

    res.status(200).json({ message: 'Agregado a favoritos con éxito.' });
  } catch (error) {
    console.error('Error al agregar favorito:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}


// controllers/user.controller.js

async removeFromFavorites(req, res) {
  try {
    const { noticia, Tipo, IdUsuario } = req.body;

    if (!noticia || !Tipo || !IdUsuario) {
      return res.status(400).json({ error: 'Faltan datos requeridos.' });
    }

    const user = await Usuario.findById(IdUsuario);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Filtrar y eliminar el favorito correspondiente
    const favoritosOriginales = user.favorites.length;
    user.favorites = user.favorites.filter(fav =>
      !(fav.contentId.toString() === noticia && fav.contentType === Tipo)
    );

    if (user.favorites.length === favoritosOriginales) {
      return res.status(404).json({ message: 'El favorito no fue encontrado.' });
    }

    await user.save();

    res.status(200).json({ message: 'Favorito eliminado con éxito.' });
  } catch (error) {
    console.error('Error al eliminar favorito:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}



// PATCH /api/usuarios/update-language
async UpdateLanguagee(req, res) {
  try {
    const userId = req.userId; // asegúrate de tener el userId autenticado
    const { language } = req.body;

    // Validar el idioma permitido
    const allowedLanguages = ['es', 'en', 'pt'];
    if (!allowedLanguages.includes(language)) {
      return res.status(400).json({ message: 'Idioma no soportado' });
    }

    // Actualizar el idioma del usuario
    const updatedUser = await Usuario.findByIdAndUpdate(
      userId,
      { language },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Idioma actualizado', language: updatedUser.language });
  } catch (error) {
    console.error('Error al actualizar el idioma:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
}

async postIdiomaUsuario(req, res) {
  try {
    const { providerId, language } = req.body;

    // Validar que los datos requeridos estén presentes
    if (!providerId || !language) {
      return res.status(400).json({ message: 'providerId y language son requeridos' });
    }

    // Validar que el idioma esté en los valores permitidos
    const validLanguages = ['es', 'en', 'fr', 'pt'];
    if (!validLanguages.includes(language)) {
      return res.status(400).json({ message: 'Idioma no válido' });
    }

    // Buscar y actualizar el usuario
    const updatedUser = await Usuario.findOneAndUpdate(
      { providerId }, // Condición para encontrar al usuario
      { language },   // Actualizar solo el campo language
      { new: true, runValidators: true } // Retornar el documento actualizado y validar
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.status(200).json({ message: 'Idioma actualizado exitosamente', user: updatedUser });
  } catch (error) {
    console.error('Error al actualizar el idioma:', error);
    return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
}

  async postNuevoUsuario(req, res) {
    try {
      const {
        name,
        email,
        password,
        gender,
        country,
        provider,
        providerId,
        avatar = '',
        categories = [],
        language = 'es'
      } = req.body;

      // Si el proveedor es 'email', usamos el email como providerId
      const finalProviderId = provider === 'email' ? email : providerId;

      // Validación básica
      if (!name || !email || !password || !gender || !country) {
        return res.status(400).json({ message: 'Faltan campos requeridos.' });
      }

      // Verificar si ya existe por email o providerId
      const usuarioExistente = await Usuario.findOne({
        $or: [
          { email },
          ...(finalProviderId ? [{ providerId: finalProviderId }] : [])
        ]
      });

      if (usuarioExistente) {
        return res.status(409).json({ message: 'Ya existe un usuario con ese email o providerId.' });
      }

      // Encriptar contraseña si es registro clásico
      let hashedPassword = '';
      if (provider === 'email') {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }

      const nuevoUsuario = new Usuario({
        name,
        email,
        password: hashedPassword,
        gender,
        country,
        provider,
        providerId: finalProviderId,
        avatar,
        categories,
        language,
        createdAt: new Date()
      });

      await nuevoUsuario.save();

      return res.status(201).json({
        message: 'Usuario registrado exitosamente.',
        usuario: {
          _id: nuevoUsuario._id,
          name: nuevoUsuario.name,
          email: nuevoUsuario.email
        }
      });

    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return res.status(500).json({ message: 'Error del servidor.' });
    }
  }
}

const usuariosController = new UsuariosController();
export default usuariosController;
