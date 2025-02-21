import { checkEnv } from './env.validation.js';

const parseEnvList = (envVar) => (envVar ? envVar.split(',').map((item) => item.trim()) : []);

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  logLevel: process.env.LOG_LEVEL || 'debug',
  db: {
    uri: process.env.DB_URI,
    options: {
      autoIndex: process.env.NODE_ENV === 'development',
    },
  },
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',').map((origin) => origin.trim()) || [
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    credentials: true,
    maxAge: 86400, // 24 hours
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  },
};

checkEnv();

export default config;
