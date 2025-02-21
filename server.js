import app from './src/app.js';
import config from './config/index.js';

const startServer = () => {
  const server = app.listen(config.port, '0.0.0.0', () => {
    console.log(`
      🚀 ${config.env.toUpperCase()}
      📍 ${config.port}
      🔗 ${config.db.uri}
    `);
  });

  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, () => {
      server.close(() => {
        console.log('\n🔴 Servidor detenido');
        process.exit(0);
      });
    });
  });
};

startServer();
