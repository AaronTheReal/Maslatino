// index.js (archivo principal del backend)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';
import { createServer } from 'http';
import { Server } from 'socket.io';
import prerender from 'prerender-node';

// Usa exactamente el mismo nombre y casing
import mainRoute from './api/MainRoute.js'; // Asegúrate que el archivo se llame exactamente 'MainRoute.js'

dotenv.config();



const app = express();
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

prerender.set('prerenderToken', 'rDjdSfG9AiLjP4fYB9Xd');
app.use(prerender); // Esto debe ir antes de tus rutas

const allowedOrigins = [
  'http://localhost:4200',
  'http://localhost:4000',

  'http://localhost:8100',
  'http://localhost:3000',
  'http://192.168.1.10:5000',
  'http://192.168.1.10:4200',
  'http://localhost:5000',
  'https://maslatinomobile.netlify.app',
  'https://maslatino.netlify.app',
  'https://maslatino.onrender.com',
  'https://super-cajeta-50e752.netlify.app',
  'https://service.prerender.io',
  'https://api.prerender.io'

  

];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);  // Permite la solicitud si el origen es válido
    } else {
      callback(new Error('CORS no permitido por esta fuente'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

app.options('*', cors());
app.use(express.json());
app.use('/aaron/maslatino', mainRoute.configRoutes(router));

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const port = process.env.PORT || 4200;
    const server = createServer(app);
    const io = new Server(server, {
      cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST']
      }
    });
    app.set('socketio', io);

    io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });

      socket.on('newNotification', (data) => {
        io.emit('updateNotifications', data);
      });
    });

    server.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
