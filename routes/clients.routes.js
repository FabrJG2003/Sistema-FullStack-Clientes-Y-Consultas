import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getClients, getClient, createClient, updateClient, deleteClient } from '../controllers/clients.controller.js';

const router = Router();

router.get('/clients', authRequired, getClients)

router.get('/clients/:id', authRequired, getClient)

router.post('/clients', authRequired, createClient)

router.delete('/clients/:id', authRequired, deleteClient)

router.put('/clients/:id', authRequired, updateClient)

export default router