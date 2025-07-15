import axios from './axios.js';

export const createSolicitudRequest = (solicitud) => axios.post(`/solicitud`, solicitud);