import { Router } from 'express';
import * as apiController from '../../../../controllers/api.controller.js';

const router = Router();

router.get('/', apiController.getProjectData);
router.get('/greet', apiController.getHelloWorld);
router.get('/docs', apiController.getApiDocs);
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    environment: config.env,
    timestamp: new Date().toISOString(),
  });
});

export default router;
