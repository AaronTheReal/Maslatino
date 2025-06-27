import { fileURLToPath } from 'url';
import multer from 'multer';
import path from 'path';
import MainController from './MainController.js';
import SpotifyController from './SpotifyController.js';
import NoticiasController from './NoticiasController.js'
import UsuariosController from './UsuariosController.js'


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
    router.route('/search').get(SpotifyController.apiSearchPodcast);
    router.route('/podcast').post(SpotifyController.savePodcast);
    router.route('/podcasts').get(SpotifyController.getAllPodcasts);

    router.route('/podcasts').get(SpotifyController.getAllPodcasts);

    //noticias
    //router.route('/noticiasGet').get(NoticiasController.getAllNoticias);
    router.route('/noticiasPost').post(NoticiasController.createNoticia);
    router.route('/getNoticias').get(NoticiasController.getAllNoticias);
    router.route('/getNoticiasInicio').post(NoticiasController.getNoticiaCategorias);

    router.route('/getNoticiaDespliegue').post(NoticiasController.getNoticiaDespliegue);

    router.route('/registrarUsuario').post(UsuariosController.postNuevoUsuario);

    return router;
  }
}

