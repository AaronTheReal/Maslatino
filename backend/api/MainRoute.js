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
import PodcastControllerPC from './PodcastControllerPC.js';
import CalendarioControllerPC from './CalendarioControllerPC.js';

import CalendarioController from './CalendarioController.js';

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
    router.post('/usuarios/:userId/last-played', UsuariosController.setLastPlayed);
    router.get('/usuarios/:userId/last-played', UsuariosController.getLastPlayed);




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
    router.get('/podcasts/by-category-name/:name', PodcastController.obtenerPodcastsPorNombreCategoria);

    router.post('/podcasts/:id/episodios', PodcastController.agregarEpisodio);
    router.put('/podcasts/:id/episodios/:episodioId', PodcastController.editarEpisodio);
    router.delete('/podcasts/:id/episodios/:episodioId', PodcastController.eliminarEpisodio);

    

    // CRUD
    // ✅ Primero las rutas específicas
    router.get('/podcasts-pc/home', PodcastControllerPC.obtenerPodcastsHome);
    router.get('/podcasts-pc/by-category-name/:name', PodcastControllerPC.obtenerPodcastsPorNombreCategoria);

    // CRUD
    router.post('/podcasts-pc', PodcastControllerPC.crearPodcast);
    router.get('/podcasts-pc', PodcastControllerPC.obtenerPodcasts);

    // ✅ Ruta paramétrica al final y con validación de ObjectId por regex
    router.get('/podcasts-pc/:id([0-9a-fA-F]{24})', PodcastControllerPC.obtenerPodcastPorId);
    router.put('/podcasts-pc/:id([0-9a-fA-F]{24})', PodcastControllerPC.actualizarPodcast);
    router.delete('/podcasts-pc/:id([0-9a-fA-F]{24})', PodcastControllerPC.eliminarPodcast);

    // Episodios (también valida el :id)
    router.post('/podcasts-pc/:id([0-9a-fA-F]{24})/episodios', PodcastControllerPC.agregarEpisodio);
    router.put('/podcasts-pc/:id([0-9a-fA-F]{24})/episodios/:episodioId([0-9a-fA-F]{24})', PodcastControllerPC.editarEpisodio);
    router.delete('/podcasts-pc/:id([0-9a-fA-F]{24})/episodios/:episodioId([0-9a-fA-F]{24})', PodcastControllerPC.eliminarEpisodio);




        // CRUD + listados
    router.post('/calendar', /*auth,*/ CalendarioController.crearItem);
    router.get('/calendar', CalendarioController.listar);
    router.get('/calendar/upcoming', CalendarioController.listarProximos);
    router.get('/calendar/past', CalendarioController.listarPasados);
    router.get('/calendar/stats', /*auth,*/ CalendarioController.stats);

    router.get('/calendar/by-category-name/:name', CalendarioController.obtenerPorNombreCategoria);

    router.get('/calendar/slug/:slug', CalendarioController.obtenerPorSlug);
    router.get('/calendar/:id', CalendarioController.obtenerPorId);

    router.put('/calendar/:id', /*auth,*/ CalendarioController.actualizarItem);
    router.patch('/calendar/:id/publish', /*auth,*/ CalendarioController.publicarItem);
    router.patch('/calendar/:id/archive', /*auth,*/ CalendarioController.archivarItem);
    router.patch('/calendar/:id/featured', /*auth,*/ CalendarioController.toggleDestacado);

    router.delete('/calendar/:id', /*auth,*/ CalendarioController.eliminarItem);

    // Bulk ops opcionales
    router.patch('/calendar/bulk/publish', /*auth,*/ CalendarioController.publicarBulk);
    router.delete('/calendar/bulk', /*auth,*/ CalendarioController.eliminarBulk);

    // OBLIGATORIO: primero rutas fijas, luego las con :id
    router.post('/calendar-pc', CalendarioControllerPC.crearItem);
    router.get('/calendar-pc', CalendarioControllerPC.obtenerItems);
    router.get('/calendar-pc/home', CalendarioControllerPC.obtenerDestacadosHome);
    router.get('/calendar-pc/by-category-name/:name', CalendarioControllerPC.obtenerPorNombreCategoria);

    // valida que el id sea un ObjectId
    router.get('/calendar-pc/:id([0-9a-fA-F]{24})', CalendarioControllerPC.obtenerItemPorId);
    router.put('/calendar-pc/:id([0-9a-fA-F]{24})', CalendarioControllerPC.actualizarItem);
    router.delete('/calendar-pc/:id([0-9a-fA-F]{24})', CalendarioControllerPC.eliminarItem);



    return router;


  }
}

