
import axios from 'axios';
import dotenv from 'dotenv';
import Podcast from '../models/Podcast.js'; // asegúrate de importar el modelo

dotenv.config();


class PodcastController {
  // 🔹 Crear un nuevo podcast
  async crearPodcast(req, res) {
    try {
      console.log(req.body);
      const podcast = new Podcast(req.body);
      await podcast.save();
      res.status(201).json(podcast);
    }  catch (error) {
        console.error('❌ Error al crear podcast:', error);
        res.status(400).json({ mensaje: 'Error al crear el podcast', error });
      }
  }

  // 🔹 Obtener todos los podcasts
  async obtenerPodcasts(req, res) {
    try {
      const podcasts = await Podcast.find().sort({ createdAt: -1 });
      res.json(podcasts);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener los podcasts', error });
    }
  }

  // 🔹 Obtener un podcast por ID
  async obtenerPodcastPorId(req, res) {
    try {
      const podcast = await Podcast.findById(req.params.id);
      if (!podcast) return res.status(404).json({ mensaje: 'Podcast no encontrado' });
      res.json(podcast);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener el podcast', error });
    }
  }

  // 🔹 Actualizar un podcast
  async actualizarPodcast(req, res) {
    try {
      const podcast = await Podcast.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      if (!podcast) return res.status(404).json({ mensaje: 'Podcast no encontrado' });
      res.json(podcast);
    } catch (error) {
      res.status(400).json({ mensaje: 'Error al actualizar el podcast', error });
    }
  }

  // 🔹 Eliminar un podcast
  async eliminarPodcast(req, res) {
    try {
      const podcast = await Podcast.findByIdAndDelete(req.params.id);
      if (!podcast) return res.status(404).json({ mensaje: 'Podcast no encontrado' });
      res.json({ mensaje: 'Podcast eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar el podcast', error });
    }
  }

  // 🔹 Agregar un episodio a un podcast
  async agregarEpisodio(req, res) {
    try {
      const { id } = req.params;
      const podcast = await Podcast.findById(id);
      if (!podcast) return res.status(404).json({ mensaje: 'Podcast no encontrado' });

      podcast.episodes.push(req.body);
      podcast.updatedAt = Date.now();
      await podcast.save();

      res.status(201).json(podcast);
    } catch (error) {
      res.status(400).json({ mensaje: 'Error al agregar episodio', error });
    }
  }

  // 🔹 Editar un episodio
  async editarEpisodio(req, res) {
    try {
      const { id, episodioId } = req.params;
      const podcast = await Podcast.findById(id);
      if (!podcast) return res.status(404).json({ mensaje: 'Podcast no encontrado' });

      const episodio = podcast.episodes.id(episodioId);
      if (!episodio) return res.status(404).json({ mensaje: 'Episodio no encontrado' });

      Object.assign(episodio, req.body);
      podcast.updatedAt = Date.now();
      await podcast.save();

      res.json(episodio);
    } catch (error) {
      res.status(400).json({ mensaje: 'Error al editar episodio', error });
    }
  }

  // 🔹 Eliminar un episodio
  async eliminarEpisodio(req, res) {
    try {
      const { id, episodioId } = req.params;
      const podcast = await Podcast.findById(id);
      if (!podcast) return res.status(404).json({ mensaje: 'Podcast no encontrado' });

      const episodio = podcast.episodes.id(episodioId);
      if (!episodio) return res.status(404).json({ mensaje: 'Episodio no encontrado' });

      episodio.remove();
      podcast.updatedAt = Date.now();
      await podcast.save();

      res.json({ mensaje: 'Episodio eliminado correctamente' });
    } catch (error) {
      res.status(400).json({ mensaje: 'Error al eliminar episodio', error });
    }
  }
}

const podcastController = new PodcastController();
export default podcastController;
