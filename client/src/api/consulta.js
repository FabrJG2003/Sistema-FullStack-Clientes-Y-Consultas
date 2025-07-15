import axios from './axios.js';
import Cookies from 'js-cookie';

export const getConsultasRequest = () => axios.get('/consultas');

export const createConsultaRequest = (consulta) => axios.post(`/consultas`, consulta);

export const getConsultasByClientNameRequest = (name) => axios.get(`/consultas/client/${name}`);

export const updateConsultaRequest = (id, consulta) => axios.put(`/consultas/${id}`, consulta);

export const getConsultasByContadorRequest = (name) => axios.get(`/consultas/${name}`);