import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { createDocument, getDocument, testPDFGeneration, getDocumentsByClient } from '../controllers/document.controller.js';

const router = Router();

router.post('/documents/test', authRequired, testPDFGeneration);
router.post('/documents', authRequired, createDocument);
router.get('/documents/:id', authRequired, getDocument);
router.get('/documents/client/:id', authRequired, getDocumentsByClient);

export default router;