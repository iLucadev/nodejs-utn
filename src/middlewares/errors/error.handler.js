import logger from '../../utils/logger.js';

const errorHandler = (err, req, res, next) => {
  // Loggear el error con contexto
  // Log the error with context
  logger.error({
    message: err.message,
    type: err.type,
    statusCode: err.statusCode,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  // API response
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode || 500).json({
      error: {
        type: err.type || 'INTERNAL_ERROR',
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
      },
    });
  }

  // View response
  const errorPage = err.statusCode === 404 ? '404' : '500';
  res.status(err.statusCode || 500).render(`error/${errorPage}`, {
    message: err.message,
    statusCode: err.statusCode,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

export default errorHandler;
