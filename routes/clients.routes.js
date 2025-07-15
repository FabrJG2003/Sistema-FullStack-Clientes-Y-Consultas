import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getClients, getClient, createClient, updateClient, deleteClient,
    getClientsByContador, getClientByName, getClientByData } from '../controllers/clients.controller.js';

const router = Router();

router.get('/clients/data', getClientByData)

router.get('/clients', authRequired, getClients)

router.get('/clients/:id', authRequired, getClient)

router.get('/clients/name/:name', authRequired, getClientByName)

router.post('/clients', authRequired, createClient)

router.delete('/clients/:id', authRequired, deleteClient)

router.put('/clients/:id', authRequired, updateClient)

router.get('/clients/contador/:contadorNombre', authRequired, getClientsByContador)

export default router