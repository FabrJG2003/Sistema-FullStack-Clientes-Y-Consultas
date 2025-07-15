import axios from './axios.js';

export const getNotificacionesRequest = () => axios.get(`/notificaciones`);

export const markAsReadRequest = (id) => axios.patch(`/notificaciones/${id}/read`);

export const getUnreadCountRequest = () => axios.get(`/notificaciones/unread-count`);

export const deleteNotificacionRequest = (id) => axios.delete(`/notificaciones/${id}`);