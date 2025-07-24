// index.js (backend principal)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';
import { createServer } from 'http';
import { Server } from 'socket.io';
import prerender from 'prerender-node';

import mainRoute from './api/MainRoute.js';

dotenv.config();

const app = express();
const router = express.Router();

// Configurar multer en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CORS: Define orígenes permitidos
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
  'https://super-cajeta-50e752.netlify.app'
];

// Configuración avanzada de CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('❌ CORS bloqueado para:', origin);
      callback(new Error('CORS no permitido por esta fuente'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// 🔒 Aplica CORS antes que cualquier ruta o middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Middleware para responder correctamente headers CORS incluso si falla `cors`
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// 🎯 Prerender solo para bots y solo para rutas que NO sean API
prerender.set('prerenderToken', 'rDjdSfG9AiLjP4fYB9Xd');
app.use((req, res, next) => {
  const userAgent = req.headers['user-agent'] || '';
  const isBot = /googlebot|bingbot|yahoo|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot/i.test(userAgent);
  const isApiRoute = req.url.startsWith('/aaron/maslatino');

  if (isBot && !isApiRoute) {
    return prerender(req, res, next);
  }

  next();
});

// Parseo de JSON
app.use(express.json());

// Rutas principales
app.use('/aaron/maslatino', mainRoute.configRoutes(router));

// 404 genérico
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Inicio del servidor
const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const port = process.env.PORT || 4200;
    const server = createServer(app);

    // Configurar Socket.IO
    const io = new Server(server, {
      cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST']
      }
    });

    app.set('socketio', io);

    io.on('connection', (socket) => {
      console.log('✅ Usuario conectado:', socket.id);

      socket.on('disconnect', () => {
        console.log('❌ Usuario desconectado:', socket.id);
      });

      socket.on('newNotification', (data) => {
        io.emit('updateNotifications', data);
      });
    });

    server.listen(port, () => {
      console.log(`🚀 Servidor activo en puerto: ${port}`);
    });

  } catch (error) {
    console.error('❌ Error al iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();


/*
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

*/


/*
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
  'https://api.prerender.io',
  'https://maslatino.onrender.com/aaron/maslatino/getNoticias'

  

];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('❌ CORS bloqueado para:', origin);
      callback(new Error('CORS no permitido por esta fuente'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware CORS – ponerlo justo después de crear app
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

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

*/