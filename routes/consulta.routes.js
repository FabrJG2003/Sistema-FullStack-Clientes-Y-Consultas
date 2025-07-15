import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { createConsulta, getConsultasByClientName, updateConsulta,
    getConsultas, getConsultasByContador } from '../controllers/consulta.controller.js';

const router = Router();

router.post('/consultas', createConsulta);

router.get('/consultas/client/:name', authRequired, getConsultasByClientName);

router.put('/consultas/:id', authRequired, updateConsulta)

router.get('/consultas', authRequired, getConsultas);

router.get('/consultas/:name', authRequired, getConsultasByContador);

export default router;