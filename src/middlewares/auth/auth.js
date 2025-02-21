import jwt from 'jsonwebtoken';
import { createAppError } from '../utils/app-error.js';

export const authenticate =
  (roles = []) =>
  (req, res, next) => {
    try {
      // 1. Obtener token
      const token = req.cookies?.jwt || req.headers.authorization?.split(' ')[1];

      if (!token) throw createAppError('Acceso no autorizado', 401);

      // 2. Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Verificar roles
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        throw createAppError('Permisos insuficientes', 403);
      }

      // 4. Adjuntar usuario al request
      req.user = {
        id: decoded.sub,
        role: decoded.role,
        email: decoded.email,
      };

      next();
    } catch (error) {
      next(error);
    }
  };

// Uso: router.get('/ruta-protegida', authenticate(['admin', 'editor']), ...)
