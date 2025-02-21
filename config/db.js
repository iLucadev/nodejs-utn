import mongoose from 'mongoose';
import config from './index.js';

const DB_URI = config.db.uri;

const connectDB = async () => {
  try {
    console.log(`🔄 Conectando a MongoDB en ${config.db.uri}...`);

    await mongoose.connect(DB_URI, {
      autoIndex: config.env === 'development',
      serverSelectionTimeoutMS: 5000,
    });

    console.log('✅ MongoDB Connected');

    ['error', 'disconnected'].forEach((event) => {
      mongoose.connection.on(event, (err) => {
        console.log(`MongoDB ${event}:`, err || '');
      });
    });
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  }
};

export default connectDB;
