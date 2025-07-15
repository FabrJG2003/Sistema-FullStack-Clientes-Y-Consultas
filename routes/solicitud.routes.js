import {Router} from 'express';
import { CreateSolicitud } from '../controllers/solicitud.controller.js';

const router = Router();

router.post('/solicitud', CreateSolicitud);

export default router;