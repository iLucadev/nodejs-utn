import 'dotenv/config';
import config from '../config/index.js';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import path from 'path';
import errorHandler from './middlewares/errors/error.handler.js';
import { createAppError } from './middlewares/errors/app-error.js';
import expressLayouts from 'express-ejs-layouts';
import connectDB from '../config/db.js';
import appRoutes from './routes/api/v1/app/app.routes.js';
import productRoutes from './routes/api/v1/products/products.routes.js';
import rateLimit from 'express-rate-limit';
import { HTTP_CODES } from './middlewares/errors/error.types.js';

console.log(`Current environment: ${config.env}`);

// Create express instance
const app = express();

// Connect DB
connectDB();

// Base middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Security, limiting and CORS
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || config.cors.origin.includes('*') || config.cors.origin.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  methods: config.cors.methods,
  allowedHeaders: config.cors.allowedHeaders,
  exposedHeaders: config.cors.exposedHeaders,
  credentials: config.cors.credentials,
  maxAge: config.cors.maxAge,
  optionsSuccessStatus: 200,
};

// Apply CORS
app.use(cors(corsOptions));

// Allow pre-flight for all routes which uses OPTIONS
app.options('*', cors(corsOptions));

if (config.env === 'development') {
  app.use(morgan('dev'));
}

// Configure static routes
app.use(expressLayouts);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));

// Rate limiting
//app.use('/api/', rateLimit(config.rateLimit));

// Main routes
app.use('/api/v1', appRoutes);
app.use('/api/v1/products', productRoutes);

// Route not found
app.use('*', (req, res, next) => {
  next(createAppError('ROUTE_NOT_FOUND', HTTP_CODES.NOT_FOUND));
});

// Error handling middleware
app.use(errorHandler);

export default app;
