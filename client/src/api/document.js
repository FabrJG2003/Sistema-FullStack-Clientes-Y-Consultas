import axios from './axios.js';

export const createDocumentRequest = (clienteId, {titulo, descripcion}) => axios.post(`/documents`, { clienteId, titulo, descripcion });

export const testCreateDocumentRequest = (clienteId) => axios.post(`/documents/test`, { clienteId });

export const getDocumentRequest = (id) => axios.get(`/documents/${id}`, {responseType: 'arraybuffer'});

export const getDocumentsByClientRequest = (clienteId) => axios.get(`/documents/client/${clienteId}`);