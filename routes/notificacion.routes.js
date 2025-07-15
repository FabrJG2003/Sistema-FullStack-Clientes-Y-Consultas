import { Router } from 'express';
import { getNotificaciones, markAsRead, getUnreadCount, deleteNotificacion } from '../controllers/notificacion.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { get } from 'mongoose';

const router = Router();

router.get('/notificaciones', authRequired, getNotificaciones);

router.get('/notificaciones/unread-count', authRequired, getUnreadCount);

router.patch('/notificaciones/:id/read', authRequired, markAsRead);

router.delete('/notificaciones/:id', authRequired, deleteNotificacion);
export default router;