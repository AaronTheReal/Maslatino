import { fileURLToPath } from 'url';
import multer from 'multer';
import path from 'path';
import MainController from './MainController.js';
import SpotifyController from './SpotifyController.js';
import NoticiasController from './NoticiasController.js'
import UsuariosController from './UsuariosController.js'
import AuthController from './AuthController.js';
import streamingController from './StreamingController.js'
import RadioController from './RadioController.js';
import CategoriasController from './CategoriasController.js';
import PodcastController from './PodcastController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'frontend', 'src', 'assets', 'images'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

export default class MainRoute {
  static configRoutes(router) {
    // ✅ Usa rutas bien formadas
    router.route('/').get(MainController.apiGetTests);


    //login
    router.route('/login').post(AuthController.login);

    router.route('/search').get(SpotifyController.apiSearchPodcast);
    router.route('/podcast').post(SpotifyController.savePodcast);
    router.route('/podcasts').get(SpotifyController.getAllPodcasts);
    router.route('/podcastIndividual').post(SpotifyController.getPodcastDespliegue);
    router.post('/showIndividual',SpotifyController.getShowDespliegue.bind(SpotifyController));

    router.route('/shows').get(SpotifyController.getShowsAndEpisodes);

    //noticias
    //router.route('/noticiasGet').get(NoticiasController.getAllNoticias);
    router.route('/noticiasPost').post(NoticiasController.createNoticia);
    router.route('/getNoticias').get(NoticiasController.getAllNoticias);
    router.route('/getNoticiasInicio').post(NoticiasController.getNoticiaCategorias);

    router.route('/getNoticiaDespliegue').post(NoticiasController.getNoticiaDespliegue);

    router.route('/registrarUsuario').post(UsuariosController.postNuevoUsuario);
    router.route('/IdiomaUsuarioInicio').put(UsuariosController.postIdiomaUsuario);
    router.route('/update-language').put(UsuariosController.UpdateLanguagee);
    router.route('/add-favorites').put(UsuariosController.addToFavorite);
    router.route('/remove-favorites').put(UsuariosController.removeFromFavorites);
    router.route('/check-favorite').post(UsuariosController.checkFavorite);
    router.route('/get-favorites/:userId').get(UsuariosController.getFavorites);
    router.route('/get-by-category/:category').get(UsuariosController.getAllByCategory);
    router.route('/get-user/:id').get(UsuariosController.getUserBack);
    router.route('/crear-stream').post(streamingController.apiCrearStreams);
    router.route('/get-stream/:id').get(streamingController.apiGetStreams);
    //Stream
   
    //
    router.post('/radioPost', RadioController.guardarRadios);
    router.get('/radios', RadioController.obtenerRadios);
    router.get('/radios/:id', RadioController.obtenerRadioPorId);

    //categorias
    router.post('/categoriaPost', CategoriasController.crearCategoria);
    router.get('/categorias', CategoriasController.obtenerCategorias);
    router.get('/categorias/:id', CategoriasController.obtenerCategoriaPorId);
    router.put('/categorias/:id', CategoriasController.actualizarCategoria);
    router.delete('/categorias/:id', CategoriasController.eliminarCategoria);

    router.post('/podcasts', PodcastController.crearPodcast);
    router.get('/podcasts', PodcastController.obtenerPodcasts);
    router.get('/podcasts/:id', PodcastController.obtenerPodcastPorId);
    router.put('/podcasts/:id', PodcastController.actualizarPodcast);
    router.delete('/podcasts/:id', PodcastController.eliminarPodcast);

    router.post('/podcasts/:id/episodios', PodcastController.agregarEpisodio);
    router.put('/podcasts/:id/episodios/:episodioId', PodcastController.editarEpisodio);
    router.delete('/podcasts/:id/episodios/:episodioId', PodcastController.eliminarEpisodio);


    
    return router;


  }
}

